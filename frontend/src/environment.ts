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
    return 3001
  }
}

export default new Environment(Environments.local_environment)