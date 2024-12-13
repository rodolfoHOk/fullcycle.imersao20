import * as KafkaLib from '@confluentinc/kafka-javascript';

export class KafkaContext {
  constructor(
    readonly message: KafkaLib.KafkaJS.Message,
    readonly messageValue: any,
    readonly topic: string,
    readonly partition: number,
    readonly consumer: KafkaLib.KafkaJS.Consumer,
  ) {}
}
