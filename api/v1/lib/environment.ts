enum Environments {
  local_environment = 'local',
  dev_environment = 'dev',
  prod_environment = 'prod',
  qa_environment = 'qa'
}

class Environment {
  private environment: String  

  constructor(environment: String) {
    this.environment = environment
  }

  getPort(): Number {
    // if (this.environment === Environments.prod_environment) {
    //   return parseInt(process.env.PROD_PORT)
    // } else if (this.environment === Environments.dev_environment) {
    //   return parseInt(process.env.DEV_PORT)
    // } else if (this.environment === Environments.qa_environment) {
    //   return parseInt(process.env.QA_PORT)
    // } else {
      return 3001
    // }
  }

  // getEnvironment(): String {
  //   if (this.environment === Environments.prod_environment) {
  //       return "prod"
  //   } else if (this.environment === Environments.dev_environment) {
  //     return "dev"
  //   } else if (this.environment === Environments.qa_environment) {
  //     return "qa"
  //   } else {
  //     return "local"
  //   }
  // }

  // getUrl(): string {
  //   return 'mongodb://localhost/' + this.getDBName()
  //   // if (this.environment === Environments.prod_environment) {
  //   //   return 'db_test_project_prod'
  //   // } else if (this.environment === Environments.dev_environment) {
  //   //   return 'db_test_project_dev'
  //   // } else if (this.environment === Environments.qa_environment) {
  //   //   return 'db_test_project_qa'
  //   // } else {
  //   //   return 'db_test_project_local'
  //   // }
  // }

  // getDBName(): String {
  //   if (this.environment === Environments.prod_environment) {
  //     return 'db_test_project_prod'
  //   } else if (this.environment === Environments.dev_environment) {
  //     return 'db_test_project_dev'
  //   } else if (this.environment === Environments.qa_environment) {
  //     return 'db_test_project_qa'
  //   } else {
  //     return 'db_test_project_local'
  //   }
  // }
}

export default new Environment(Environments.local_environment)