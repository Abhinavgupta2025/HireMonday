pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Abhinavgupta2025/HireMonday.git'
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

        stage('Push Frontend') {
            steps {
                sh 'docker push thursday1878/frontend:latest'
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh 'kubectl rollout restart deployment frontend-deployment -n nginx-ns'
            }
        }
    }
}
