import { ref, Ref } from 'vue';

export default function useTouchInput(initialValue = ''): [Ref<string>, (newValue: string) => void] {
  const fieldValue = ref(initialValue);

  const onChange = (newVal: string) => {
    fieldValue.value = newVal;
  };

  return [fieldValue, onChange];
}
