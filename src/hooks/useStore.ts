import { key } from '../store';
import { AppStore } from '../store/State';
import { Store, useStore as useVuexStore } from 'vuex';

export function useStore(): Store<AppStore> {
  return useVuexStore(key);  
}
