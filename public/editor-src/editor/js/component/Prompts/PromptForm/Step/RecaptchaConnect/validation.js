import Config from "visual/global/Config";
import { makeRequest } from "../../../common/utils";

export async function validateRecaptcha(data) {
  try {
    return await createRecaptcha(data);
  } catch (error) {
    return error;
  }
}

function createRecaptcha({ sitekey, secretkey }) {
  // Uses window.parent because have problems with inner iframe and recaptcha
  const _window = window.parent;
  const recaptchaDiv = createRecaptchaDiv(_window);
  const recaptchaScript = createRecaptchaScript(_window);

  return new Promise((res, rej) => {
    recaptchaScript.onload = () => {
      const grecaptcha = _window.parent.grecaptcha;

      _window.onloadRecaptchaCallback = () => {
        const recaptchaId = grecaptcha.render(recaptchaDiv, {
          sitekey,
          size: "invisible",
          callback: async response => {
            // Validation response google hash and secretkey from the server
            const { status } = await validateRecaptchaAccount({
              secretKey: secretkey,
              response: response
            });

            recaptchaDiv.remove();
            recaptchaScript.remove();

            res(status === 200);
          },
          "error-callback": () => {
            recaptchaDiv.remove();
            recaptchaScript.remove();

            rej(false);
          }
        });

        // Reset recaptchaId
        grecaptcha.reset(recaptchaId);

        // Execute Submit
        grecaptcha.execute(recaptchaId);
      };
    };
  });
}

function createRecaptchaScript(_window) {
  const body = _window.document.body;
  const scriptElement = document.createElement("script");
  scriptElement.setAttribute(
    "src",
    "https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit"
  );
  scriptElement.setAttribute("async", "async");
  scriptElement.setAttribute("defer", "defer");

  body.append(scriptElement);

  return scriptElement;
}

function createRecaptchaDiv(_window) {
  const body = _window.document.body;
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "brz-ed-recaptcha brz-hidden");

  body.append(divElement);

  return divElement;
}

function validateRecaptchaAccount(body) {
  const { api } = Config.get("wp");
  const objectToUrlEncoded = Object.keys(body)
    .map(key => `${key}=${body[key]}`)
    .join("&");

  return makeRequest({
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    url: api.url,
    queryParams: {
      action: api.validateRecaptchaAccount,
      hash: api.hash
    },
    body: objectToUrlEncoded
  });
}
