pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/qinscode/JobTracker.git'
        DOCKER_IMAGE = 'jobtracker'
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'jobtracker-container'
        VITE_API_URL = credentials('API_URL_SECRET')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: env.GITHUB_REPO
            }
        }

        stage('Generate .env file') {
            steps {
                sh '''
                    echo "VITE_API_URL=${VITE_API_URL}" > .env
                '''
            }
        }

        stage('Environment Info') {
            steps {
                sh '''
                    echo "Node version:"
                    node --version
                    echo "Yarn version:"
                    yarn --version
                    echo "Docker version:"
                    docker --version
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

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                        docker run -d --name ${CONTAINER_NAME} -p 4173:4173 ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
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