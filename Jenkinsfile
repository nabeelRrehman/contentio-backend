pipeline {
    
    agent any
    tools {nodejs "default-nodejs"}
    
    stages {
        stage('Check NodeJS version') {
            steps {
                sh 'node --version'
            }
        }
        
        stage('Check NPM version') {
            steps {
                sh 'npm --version'
            }
        }
        
        // stage('SCM Checkout') {
        //     steps {
        //         git credentialsId: '986a7546-2562-4601-b0b6-054d69e2d25b', url: 'https://github.com/bnglabs/contentio-backend.git'
        //     }
        // }
        nodejs('default-nodejs') {
        stage('Build and Install Dependencies') {
            steps {
                sh 'cd "/var/lib/jenkins/workspace/Contentio Backend"'
                powershell 'npm install'
            }
        }

         stage('Install PM2') {
            steps {
                sh 'cd "/var/lib/jenkins/workspace/Contentio Backend"'
                sh 'npm install -g pm2'
            }
         }

         stage('') {
             stpes {

             }
         }

         stage('Run Application With PM2') {
           steps {
               sh 'cd "/var/lib/jenkins/workspace/Contentio Backend"'
                sh 'pm2 start index.js --name contentio'
           }
         }
        
    }
}