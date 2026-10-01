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

        if (request.url === '/metrics') {
            return next.handle();
        }

        const method = request.method;
        const route = request.route?.path || request.url;

        this.inProgressGauge.inc({ method });
        const endTimer = this.requestDuration.startTimer({ method, route });

        let recorded = false;
        const record = () => {
            if (recorded) return;
            recorded = true;
            
            const status = String(response.statusCode);
            this.requestCounter.inc({ method, route, status });
            this.inProgressGauge.dec({ method });
            endTimer({ status });
        };

        response.once('finish', record);
        response.once('close', record);

        return next.handle();
    }
}
