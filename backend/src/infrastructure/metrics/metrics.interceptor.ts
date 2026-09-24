import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge, Histogram } from 'prom-client';
import { Observable, tap } from 'rxjs';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
    constructor(
        @InjectMetric('http_requests_total')
        private readonly requestCounter: Counter<string>,

        @InjectMetric('http_request_duration_seconds')
        private readonly requestDuration: Histogram<string>,

        @InjectMetric('http_requests_in_progress')
        private readonly inProgressGauge: Gauge<string>,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        // Не считаем сам /metrics, иначе будет шум и рекурсия
        if (request.url === '/metrics') {
            return next.handle();
        }

        const method = request.method;
        // ВАЖНО: route.path, а не url — иначе взрыв кардинальности
        const route = request.route?.path || request.url;

        this.inProgressGauge.inc({ method });
        const endTimer = this.requestDuration.startTimer({ method, route });

        return next.handle().pipe(
            tap({
                next: () => {
                    const status = String(response.statusCode);
                    this.requestCounter.inc({ method, route, status });
                    this.inProgressGauge.dec({ method });
                    endTimer({ status });
                },
                error: (error) => {
                    const status = String(error.status || 500);
                    this.requestCounter.inc({ method, route, status });
                    this.inProgressGauge.dec({ method });
                    endTimer({ status });
                },
            }),
        );
    }
}
