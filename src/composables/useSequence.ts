import {ref} from "vue";

export default function useSequence(maxLength: number = 1) {
    const items = ref<Array<any>>([]);

    function push(item: any): any | undefined {
        items.value.push(item);
        if (items?.value.length > maxLength) return items.value.splice(0, 1)[0];
    }

    return {
        push,
        items,
    }
}