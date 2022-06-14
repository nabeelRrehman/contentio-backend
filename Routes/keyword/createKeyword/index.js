const { default: axios } = require("axios");
const {
  rapid_host,
  rapid_key,
  paraphraser_host,
} = require("../../../Config/GoogleSearch");
const { saveNewData } = require("../../../Helpers");

const getGoogleKeyword = async (keyword) => {
  let options = {
    url: `https://google-search26.p.rapidapi.com/search`,
    method: "GET",
    params: { q: keyword, hl: "en", tbs: "qdr:a" },
    headers: {
      "x-rapidapi-key": rapid_key,
      "x-rapidapi-host": rapid_host,
    },
  };

  try {
    let response = await axios.request(options);
    return response.data;
  } catch (e) {
    return e.response.data.message;
  }
};

const getParaphraser = async (data) => {
  let options = {
    url: `https://text-rewriter-paraphrasing1.p.rapidapi.com/rewrite`,
    method: "POST",
    headers: {
      "x-rapidapi-key": rapid_key,
      "x-rapidapi-host": paraphraser_host,
    },
    data,
  };

  try {
    let response = await axios.request(options);
    return response;
  } catch (e) {
    return e.response.data.message;
  }
};

const getGoogleKeywordPromise = (keyword, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        let response = await getGoogleKeyword(keyword.name);

        if (response.results && response.results.length) {
          let googleKeyword = response.results.map((res) => res.title);
          let randomIndex = getRandomIndex(googleKeyword);
          let resultClone = googleKeyword.slice(randomIndex, randomIndex + 1);

          resolve({
            keyword: keyword.name,
            estimatedTraffic: keyword.estimatedTraffic
              ? keyword.estimatedTraffic
              : 0,
            title: resultClone[0],
          });
        } else {
          resolve({});
        }
      } catch (e) {
        console.log(e.response.data.message);
      }
    }, timeout);
  });
};

const paraPhraserPromise = (item, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        let data = {
          input_text: item.title,
          model_name: "rewrite",
          length: 200,
        };
        console.log(Date.now(), "time");
        let response = await getParaphraser(data);

        if (response && response.data) {
          let paraPhrase = response.data.text;

          resolve({
            name: item.keyword,
            estimatedTraffic: item.estimatedTraffic ? item.estimatedTraffic : 0,
            recommendedTitles: paraPhrase,
          });
        } else {
          resolve({});
        }
      } catch (e) {
        console.log(e.response.data.message);
      }
    }, timeout);
  });
};

const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const keywordForParaphraser = async (result) => {
  try {
    return await Promise.all(
      result.map((item, index) => paraPhraserPromise(item, 1000))
    );
  } catch (e) {
    console.log(e.response.data.message);
  }
};

const createKeyword = async (req, res) => {
  let { userId } = req;
  const { keywords, targetCountry, projectId } = req.body;

  try {
    if (keywords && keywords.length) {
      Promise.all(
        keywords.map((item, index) => getGoogleKeywordPromise(item, 1000))
      ).then(async (resp) => {
        let responseClone = resp.filter(
          (result) => Object.keys(result).length && result
        );

        let paraphrase = await keywordForParaphraser(responseClone);
        let paraphraseClone = paraphrase.filter(
          (result) => Object.keys(result).length && result
        );

        if (paraphraseClone.length) {
          let arr = [];
          paraphraseClone.map((para) => {
            arr.push({
              name: para.name,
              estimatedTraffic: para.estimatedTraffic,
              recommendedTitles: [
                {
                  title: para.recommendedTitles,
                },
              ],
            });
          });

          let obj = {
            targetCountry,
            project: projectId,
            user: userId,
            keywords: arr,
          };

          let keywordSave = await saveNewData("keyword", obj);
          res.status(200).send({
            status: 200,
            keyword: keywordSave,
            message: "Successfully created!",
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "No recommended titles found!",
          });
        }
      });
    }
  } catch (e) {
    console.log("error throws catch");
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = createKeyword;
