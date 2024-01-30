pipeline {
    agent { label 'ec2-basic' }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test Step 1') {
            steps {
                // Fügen Sie Ihre Testbefehle hier ein
                echo 'Running Test Step 1...'
                // sh '...'
            }
        }

        stage('Test Step 2') {
            steps {
                echo 'Running Test Step 2...'
                // sh '...'
            }
        }

        stage('Test Step 3') {
            steps {
                echo 'Running Test Step 3...'
                // sh '...'
            }
        }

        stage('Test Step 4') {
            steps {
                echo 'Running Test Step 4...'
                // sh '...'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Ruft das Shell-Skript auf, um das Docker-Image zu bauen und zu pushen
                    sh './build-and-push.sh'
                }
            }
        }
    }
            
    post {
        success {
            echo 'Pipeline succesfull!'
        }
        failure {
            echo 'Pipeline failed'
        }
        always {
            echo 'Pipeline finished'
        }
    }
}