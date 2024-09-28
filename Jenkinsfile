pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/qinscode/JobTracker.git'
        DEPLOY_PATH = '~/project/jobtracker'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: env.GITHUB_REPO
            }
        }

        stage('Environment Info') {
            steps {
                sh '''
                    echo "Node version:"
                    node --version
                    echo "Yarn version:"
                    yarn --version
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'yarn install'
            }
        }

        stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        }

        stage('Format Check') {
            steps {
                sh 'yarn format:check'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }

        stage('Test') {
            steps {
                echo 'No test script specified in package.json. Skipping tests.'

            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deploying to production..."
                    # 确保目标目录存在
                    mkdir -p ${DEPLOY_PATH}

                    # 复制构建文件到部署目录
                    cp -R dist/* ${DEPLOY_PATH}/

                    echo "Deployment completed."
                '''
            }
        }
    }

    post {
        success {
            echo 'JobTracker build and deployment successful!'
        }
        failure {
            echo 'JobTracker build or deployment failed.'
        }
    }
}