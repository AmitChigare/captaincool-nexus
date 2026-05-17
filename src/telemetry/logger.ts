export class TelemetryLogger {
  static logActivity(subsystem: string, load: number, event: string) {
    // Pipe to observability dashboard (e.g. Datadog / Google Cloud Logging)
    console.log(`[Telemetry][${subsystem}] Load: ${load}% | Event: ${event}`);
  }
}
