const sortElements = (responses, sortOptions, sortBy, direction) => {
  switch (sortOptions.findIndex((option) => option == sortBy)) {
    case 0:
      if (direction == "asc")
        responses.sort((postA, postB) => postA.id - postB.id);
      else responses.sort((postA, postB) => postB.id - postA.id);

      break;
    case 1:
      if (direction == "asc")
        responses.sort((postA, postB) => postA.reads - postB.reads);
      else responses.sort((postA, postB) => postB.reads - postA.reads);

      break;
    case 2:
      if (direction == "asc")
        responses.sort((postA, postB) => postA.likes - postB.likes);
      else responses.sort((postA, postB) => postB.likes - postA.likes);

      break;
    case 3:
      if (direction == "asc")
        responses.sort((postA, postB) => postA.popularity - postB.popularity);
      else
        responses.sort((postA, postB) => postB.popularity - postA.popularity);

      break;
  }

  return responses;
};

const removeRepeatedElements = (responses) => {
  responses.reduce((first, second) => {
    if (!first.some((obj) => obj.id === second.id)) {
      first.push(second);
    }
    return first;
  }, []);

  return responses;
};

module.exports = {
  sortElements: sortElements,
  removeRepeatedElements: removeRepeatedElements,
};
