
pipeline {
    agent any

    stages {

        // Stage 1: Retrieve source code
        stage('Checkout Source Code') {
            steps {
                echo 'Source code retrieved from GitHub successfully'
            }
        }

        // Stage 2: Install dependencies
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies'
                bat 'npm ci'
            }
        }

        // Stage 3: Test REST API
        stage('Run Tests') {
            steps {
                echo 'Running REST API tests'
                bat 'npm test'
            }
        }

        // Stage 4: Build application
        stage('Build Application') {
            steps {
                echo 'Building REST API application'

                powershell '''
                    if (Test-Path "rest-api-artifact.zip") {
                        Remove-Item "rest-api-artifact.zip" -Force
                    }

                    Compress-Archive `
                        -Path server.js, package.json, package-lock.json, test `
                        -DestinationPath rest-api-artifact.zip `
                        -Force
                '''
            }
        }

        // Stage 5: Archive generated artifacts
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving application artifacts'

                archiveArtifacts(
                    artifacts: 'rest-api-artifact.zip',
                    fingerprint: true
                )
            }
        }
    }

    post {
        success {
            echo '================================'
            echo 'BUILD SUCCESSFUL!'
            echo 'REST API application built.'
            echo 'Artifact archived successfully.'
            echo '================================'
        }

        failure {
            echo 'BUILD FAILED! Check Console Output.'
        }

        always {
            echo 'Jenkins pipeline execution completed.'
        }
    }
}
