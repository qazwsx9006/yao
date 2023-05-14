const Router = require("./router").getRouter();
const Joi = Router.Joi;

const generateDefaultGetValidate = (schema) => ({
  query: schema,
  output: {
    200: DEFAULT_VALIDATE_200_OUTPUT,
  },
  // continueOnError: true,
});

const generateOtherValidate = (schema) => ({
  type: "json",
  body: schema,
  output: {
    200: DEFAULT_VALIDATE_200_OUTPUT,
  },
  continueOnError: true,
});

const generateDefaultPostValidate = (schema) => {
  let setting = {
    output: {
      200: DEFAULT_VALIDATE_200_OUTPUT,
    },
    continueOnError: true,
  };
  if (schema) {
    setting.type = "json";
    setting.body = schema;
  }
  return setting;
};

const generateDefaultPatchValidate = (schema) => {
  let setting = {
    output: {
      200: DEFAULT_VALIDATE_200_OUTPUT,
    },
    continueOnError: true,
  };
  if (schema) {
    setting.type = "json";
    setting.body = schema;
  }
  return setting;
};

const generateGetValidate = (schema, output) => {
  let setting = {
    query: schema,
    continueOnError: true,
  };
  if (output) {
    setting.output = {
      200: { body: output },
    };
  }

  return setting;
};

const generatePostValidate = (schema, output) => {
  let setting = {
    continueOnError: true,
  };
  if (schema) {
    setting.type = "json";
    setting.body = schema;
  }
  if (output) {
    setting.output = {
      200: { body: output },
    };
  }
  return setting;
};

const generatePatchValidate = (schema, output) => {
  let setting = {
    continueOnError: true,
  };
  if (schema) {
    setting.type = "json";
    setting.body = schema;
  }
  if (output) {
    setting.output = {
      200: { body: output },
    };
  }

  return setting;
};

const generateDeleteValidate = (schema, output) => {
  let setting = {
    type: "json",
    body: schema,
    continueOnError: true,
  };
  if (output) {
    setting.output = {
      200: { body: output },
    };
  }

  return setting;
};

const generateMultipartValidate = (output) => {
  let setting = {
    type: "multipart",
  };
  if (output) {
    setting.output = {
      200: { body: output },
    };
  }
  return setting;
};

const generateMultipartWithMulterValidate = (output) => {
  // 由於 prefix 使用正規表達的做法 prefix('/v([5,6])') 的做法，會在 ctx.params 建立
  // {'0': $version} 的物件，所以驗證的時候要讓 '0' 通過
  let setting = {
    /**
     * type 如果指定為 'multipart', 則由於 joi 會優先使用 busboy 來 parse, 因此會造成
     * multer 的部分 file 為 undefined。 因此不能指定 type, 讓 joi 不 parse 直接往下進入 multer 的 parse。
     *
     * type: 'multipart',
     */
    params: {
      0: Joi.string(),
    },
    continueOnError: true,
  };
  if (output) {
    setting.output = {
      200: { body: output },
    };
  }
  return setting;
};

const DEFAULT_VALIDATE_200_OUTPUT = {
  body: {
    status: Joi.number(),
    code: Joi.number(),
    name: Joi.string(),
    data: Joi.alternatives().try(Joi.array(), Joi.object()),
    message: Joi.string(),
  },
};

const DEFAULT_VALIDATE_200_OUTPUT_ARRAY = {
  body: {
    statusCode: Joi.number(),
    code: Joi.number(),
    data: Joi.array(),
    message: Joi.string(),
  },
};

module.exports = {
  Joi,
  generateDefaultGetValidate,
  generateGetValidate,
  generateOtherValidate,
  generateDefaultPostValidate,
  generateDefaultPatchValidate,
  generateMultipartValidate,
  generateMultipartWithMulterValidate,
  generatePostValidate,
  generatePatchValidate,
  generateDeleteValidate,
  DEFAULT_VALIDATE_200_OUTPUT,
  DEFAULT_VALIDATE_200_OUTPUT_ARRAY,
};
