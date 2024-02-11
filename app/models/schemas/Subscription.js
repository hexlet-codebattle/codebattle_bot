import { Model } from 'objection';

class Subscription extends Model {
  static get tableName() {
    return 'bot_subscriptions';
  }

  static get relationMappings() {
    return {};
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['messengerType', 'topic', 'status'],

      properties: {
        id: { type: 'integer' },
        messengerType: { type: 'string' },
        messengerChannelId: { type: 'integer' },
        topic: { type: 'string' },
        status: { type: 'string' },
      },
    };
  }
}

export default Subscription;
