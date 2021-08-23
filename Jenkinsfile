/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    tools { nodejs 'NodeJs_10.24.0' }

    stages {
        stage('Build') {
            steps {
                sshagent(['Dev1_instance_ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@34.197.45.248 "
                            cd ~/testdGO-main
                            git pull
                            npm install
                            CI=true npm run build
                        "
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['Dev1_instance_ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@34.197.45.248 "
                            rm -rf ~/Deployment-Builds/testdGO-main/*
                            cp -r ~/testdGO-main/build/* ~/Deployment-Builds/testdGO-main/
                        "
                    '''
                }
            }
        }
    }
}
