pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/Abhinavgupta2025/HireMonday.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('Backend') {
                    sh 'docker build -t thursday1878/backend:latest .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t thursday1878/frontend:latest .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Backend') {
            steps {
                sh 'docker push thursday1878/backend:latest'
            }
        }

        stage('Push Frontend') {
            steps {
                sh 'docker push thursday1878/frontend:latest'
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                sh 'kubectl rollout restart deployment backend-deployment -n nginx-ns'
                sh 'kubectl rollout restart deployment frontend-deployment -n nginx-ns'
            }
        }
    }
}
