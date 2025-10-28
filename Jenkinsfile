pipeline {
    agent any
    environment {
        # ==> CHANGE 'yourdockerhubusername' TO YOURS
        DOCKER_IMAGE = "timthy45/crypto-zombies:${BUILD_NUMBER}" 
        AWS_REGION = "us-east-1"
        EKS_CLUSTER_NAME = "petclinic-eks-cluster" # Must match terraform/eks.tf
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/UjjwalPardeshi/Devops_Crypto_Zombies.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ./project"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry(url: 'https://index.docker.io/v1/', credentialsId: 'docker-hub-creds') {
                    sh "docker push ${DOCKER_IMAGE}"
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh "aws eks --region ${AWS_REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}"
                    sh "kubectl set image deployment/crypto-zombies-deployment crypto-zombies-container=${DOCKER_IMAGE}"
                }
            }
        }
    }
}

