export const usersDefault = () => {
  const rndNum = generateNum(50);
  return {
    result: generateUsers(10, rndNum),
    nextPageUrl: `page_url_${rndNum + 1} with space`,
    previousPageUrl: `page_url_${rndNum - 1} with space`,
  };
};

function generateUsers(amount, from = 1) {
  return Array.apply(null, {
    length: amount > 0 ? amount : 1,
  }).map((t, num) => {
    return generateUserById(num + from);
  });
}

export const singleUserById = (id) => {
  return {
    result: generateUserById(id)
  }
};

function generateUserById(id) {
  return {
    id: id,
    name: `name${id}`,
    avatarUrl: getRandomURL(),
  };
}

const avatarURLs = [
  'http://www.fakepersongenerator.com/Face/female/female1026392491180.jpg',
  'http://www.fakepersongenerator.com/Face/female/female20151024086262360.jpg',
  'http://www.fakepersongenerator.com/Face/female/female20141023753546234.jpg',
  'http://www.fakepersongenerator.com/Face/female/female20161024637252075.jpg',
  'http://www.fakepersongenerator.com/Face/female/female1022254865936.jpg',
  'http://www.fakepersongenerator.com/Face/female/female1021901868835.jpg',
  'http://www.fakepersongenerator.com/Face/female/female20161025168889740.jpg',
  'http://www.fakepersongenerator.com/Face/female/female20161024870617340.jpg',
  'http://www.fakepersongenerator.com/Face/female/female20151024076629120.jpg',
  'http://www.fakepersongenerator.com/Face/female/female20161025780663055.jpg',
];

function getRandomURL() {
  const idx = generateNum(avatarURLs.length - 1);
  return avatarURLs[idx];
}

function generateNum(max) {
  return Math.round(Math.random() * max);
}
