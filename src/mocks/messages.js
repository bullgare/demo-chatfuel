import { singleUserById } from './users';

export function generateMessages(count) {
  return [...Array(count).keys()].map((v, k) => generateMessage(k));
}

function generateMessage(key) {
  return {
    user: (singleUserById(key)).result,
    time: new Date(),
    text: generateText()
  }
}

function generateText() {
  const count = Math.round(Math.random() * 40) + 10;

  return [...Array(count).keys()].map(() => {
    const pos = Math.round(Math.random() * words.length);

    return words[pos];
  }).join(' ');
}

const words = ("React’s class component API has been around for years with little change However, as we add support for more advanced features such as error boundaries and the upcoming async rendering mode we stretch this model in ways that it was not originally intended " +
    "For example, with the current API, it is too easy to block the initial render with non-essential logic In part this is because there are too many ways to accomplish a given task, and it can be unclear which is best We’ve observed that the interrupting behavior of error handling is often not taken into consideration and can result in memory leaks something that will also impact the upcoming async rendering mode The current class component API also complicates other efforts, like our work on prototyping a React compiler " +
    "Many of these issues are exacerbated by a subset of the component lifecycles componentWillMount, componentWillReceiveProps, and componentWillUpdate These also happen to be the lifecycles that cause the most confusion within the React community For these reasons, we are going to deprecate those methods in favor of better alternatives " +
    "We recognize that this change will impact many existing components Because of this, the migration path will be as gradual as possible, and will provide escape hatches At Facebook, we maintain more than 50,000 React components We depend on a gradual release cycle too").split(' ');