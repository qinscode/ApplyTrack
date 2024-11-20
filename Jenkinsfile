pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/qinscode/JobTracker.git'
        DOCKER_IMAGE = 'jobtracker'
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'jobtracker-container'
        NEXT_API_URL = credentials('API_URL_SECRET')
        NEXT_PUBLIC_GOOGLE_CLIENT_ID = credentials('VITE_GOOGLE_CLIENT_ID')
        DOCKER_BUILDKIT=1
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
                    echo "NEXT_API_URL=${NEXT_API_URL}" > .env
                    echo "NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}" >> .env
                '''
            }
        }

        stage('Environment Info') {
            steps {
                sh '''
                    echo "Node version:"
                    node --version
                    echo "Pnpm version:"
                    pnpm --version
                    echo "Docker version:"
                    docker --version
                '''
            }
        }

        stage('Lint and Format') {
            steps {
                sh 'pnpm install'
                sh 'pnpm lint:fix'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // 使用 BuildKit 构建 Docker 镜像
                    sh """
                        DOCKER_BUILDKIT=1 docker build \
                            --build-arg PORT=4173 \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    """
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    sh """
                        # 停止并删除旧容器
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true

                        # 运行新容器
                        docker run -d \
                            --name ${CONTAINER_NAME} \
                            -p 4173:4173 \
                            --restart unless-stopped \
                            ${DOCKER_IMAGE}:${DOCKER_TAG}

                        # 清理旧镜像
                        docker images ${DOCKER_IMAGE} --format "{{.ID}}" | sort -r | tail -n +4 | xargs -r docker rmi

                        echo "Waiting for container to start..."
                        sleep 10

                        # 检查容器是否正常运行
                        if ! docker ps | grep -q ${CONTAINER_NAME}; then
                            echo "Container failed to start"
                            exit 1
                        fi
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
            script {
                // 在失败时清理
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true
                """
            }
        }
        always {
            // 清理工作区
            cleanWs()
        }
    }
}