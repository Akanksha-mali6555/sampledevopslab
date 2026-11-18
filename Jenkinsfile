
pipeline {
    agent any

    stages {

        stage('Checkout Source Code') {
            steps {
                echo 'Retrieving source code from GitHub'

                git branch: 'main',
                    url: 'https://github.com/YOUR_USERNAME/REST-API-Jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies'

                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executing REST API tests'

                bat 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Generating application artifact'

                powershell '''
                    Compress-Archive `
                    -Path server.js, package.json, package-lock.json, test `
                    -DestinationPath rest-api-artifact.zip `
                    -Force
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo 'Archiving generated artifacts'

                archiveArtifacts artifacts: 'rest-api-artifact.zip',
                    fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL!'
        }

        failure {
            echo 'BUILD FAILED!'
        }
    }
}

