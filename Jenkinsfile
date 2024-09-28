pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/qinscode/JobTracker.git'
        DEPLOY_PATH = '/home/ubuntu/project/jobtracker'
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

        stage('Format Code') {
            steps {
                sh 'yarn format'
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

        stage('Deploy and Start') {
            steps {
                sh '''
                    echo "Deploying to production..."

                    sudo mkdir -p ${DEPLOY_PATH}

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