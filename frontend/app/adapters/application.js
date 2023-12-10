import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = 'http://localhost:3000';
  namespace = 'api';

  @computed
  get headers() {
    return {
      'Accept': 'application/json',
    };
  }
}