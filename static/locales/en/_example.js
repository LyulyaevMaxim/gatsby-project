export default {
  namespace1: {
    'Welcome to React': 'Welcome to $t(react) and react-i18next', //вставили значение из соседнего перевода
    react: 'React',
    //автоматический выбор перевода в зависимости от числа (всегда указывается как count),
    //даже если само число в переводе реально не исп-ся
    item: 'item', //t('key', {count: 1}); // -> "item"
    item_plural: 'items', //t('key', {count: 0}); // -> "items"
    itemWithCount: '{{count}} item',
    itemWithCount_9: '{{count}} items + surprise', //для конкретного count
    itemWithCount_plural: '{{count}} items',
    //i18next-intervalplural-postprocessor: t('key_interval', {postProcess: 'interval', count: 4}); -> "a few items"
    item_interval: '(1){one item};(2-7){a few items};(7-inf){a lot of items};',
    //гибкий вариант: t('friend', { context: 'male' }); // -> "A boyfriend"
    friend: 'A friend',
    friend_female: 'A girlfriend',
    friend_male: 'A boyfriend',
    friend_male_plural: '{{count}} boyfriends', //t('friend', {context: 'male', count: 100}); -> "100 boyfriends"
  },
  namespace2: {
    //вставили значение из другого namespace
    key: 'hello from namespace 2 for $t{namespace1:react}',
    //можем пробросить значения в вставляемый перевод: t('girlsAndBoys', {count: 2, girls: 3}) => "3 girls and 2 boys"
    girls_plural: '{{count}} girl',
    girlsAndBoys: "$t(girls, {'count': {{girls}} }) and {{count}} boy",
    //можем пробрасывать другие переводы в момент вызова: t('sayX', {val: '$t(namespace1:react)'}) => "say: React"
    sayX: 'say: {{val}}',

    //work with arrays:
    //- t('reasonsOfFail', { returnObjects: true }) => ['a', 'b', 'c']
    //- t('reasonsOfFail', { joinArrays: ' or ', customReason: 'd' }) => 'a or b or c or d'
    reasonsOfFail: ['a', 'b', 'c', '{{customReason}}'],

    ///work with object: t('objectExample', { returnObjects: true, something: 'gold' }) => "{ res: 'added gold' }"
    objectExample: {
      res: 'added {{something}}',
      reason: 'because of {{reasonsOfFail[1]}} or {{objectExample.res}}',
    },
  },
}
