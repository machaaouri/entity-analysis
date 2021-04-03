// 3rd party libraries
import debug from "debug";
import dotenv from "dotenv";

// Load .env file
dotenv.config();
const debugLog: debug.IDebugger = debug("config");

// type Secret = {
//   type: string;
//   project_id: string;
//   private_key_id: string;
//   private_key: string;
//   client_email: string;
//   client_id: string;
//   auth_uri: string;
//   token_uri: string;
//   auth_provider_x509_cert_url: string;
//   client_x509_cert_url: string;
// };

export interface Config {
  // Environment
  NODE_ENV: "test" | "development" | "production";
  // Port to run on, defaults to `4000`
  PORT: number;
  CLIENT_URL: string;
  GOOGLE_PROJECT_ID: string;
  PUBSUB_TOPIC_NAME_INPUT: string;
  PUBSUB_TOPIC_NAME_OUTPUT: string;
  PUBSUB_SUBSCRIPTION_NAME: string;
  GOOGLE_APPLICATION_CREDENTIALS: string;
  FIREBASE_KEY: string;
}

interface EnvVarConfig {
  // The ENV variable name as defined in the `.env` file or via the CLI
  env: string;
  // Whether the variable should be exposed in the log or not. Defaults to
  // `false`.
  confidential?: boolean;
  // Whether an error should be thrown if this variable was not provided on
  // build / run
  required?: boolean;
  // If there should be a default, provide it here. This will be evaluated
  // _before_ the `required`.
  default?: string;
  // If no ENV is provided, it will default to the value provided in the
  // specified ENV. Note: the key we're defaulting from must be provided
  // _before_ the ENV utilizing it.
  defaultFrom?: keyof Config;
  // Transformation function, a function which will accept the string
  // environment variable and output it however it wants it to be inserted into
  // the resulting `config` object
  transform?: (value: string) => any;

  validation?: (value: any) => boolean;
}

const envVars: EnvVarConfig[] = [
  {
    env: "NODE_ENV",
    default: "development",
    required: false,
    validation: (v?: string) => v === "development" || v === "production",
  },
  {
    env: "PORT",
    default: "4000",
    required: false,
    transform: (v: string) => parseInt(v),
  },
  {
    env: "CLIENT_URL",
    default: "http://localhost:3000",
    confidential: false,
    required: false,
  },
  {
    env: "GOOGLE_PROJECT_ID",
    confidential: true,
    required: true,
  },
  {
    env: "PUBSUB_TOPIC_NAME_INPUT",
    default: "analyzer_input",
    required: true,
  },
  {
    env: "PUBSUB_TOPIC_NAME_OUTPUT",
    default: "analyzer_output",
    required: true,
  },
  {
    env: "PUBSUB_SUBSCRIPTION_NAME",
    default: "analyzer_output-sub",
    required: true,
  },
  {
    env: "GOOGLE_APPLICATION_CREDENTIALS",
    required: true,
    confidential: true,
  },
  {
    env: "FIREBASE_KEY",
    confidential: true,
    required: true,
  },
];

let configLog = "Configuration:\n";
export const config: Config = envVars.reduce(
  (
    config: Partial<Config>,
    {
      env,
      confidential = false,
      required = true,
      default: def,
      transform = (v: string | undefined) => v,
      validation = () => true,
      defaultFrom,
    }: EnvVarConfig
  ) => {
    let value: string | undefined = process.env[env];
    if (!value && def !== undefined) {
      value = def;
    }
    if (!value && defaultFrom) {
      if (!(defaultFrom in process.env)) {
        throw new Error(
          `environment variable "${env}" is attempting to default from a currently non-existant environment variable "${defaultFrom}". Make sure it's defined _before_ attempting to utilize it.`
        );
      }

      value = process.env[defaultFrom];
    }

    if (required && !value) {
      throw new Error(`required environment variable "${env}" not set.`);
    }

    value = transform(value);

    if (!validation(value)) {
      throw new Error(`environment variable "${env}" is invalid.`);
    }

    // Write the the modules export
    config[env] = value;
    // Overwrite the `process.env` as well (just incase that's used too).
    process.env[env] = value;
    // Add to log string
    configLog += `${env}=${confidential && value ? "** censored **" : value}\n`;

    return config;
  },
  {}
) as Config;

debugLog(configLog);
