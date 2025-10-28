pipeline {
    agent any

    environment {
        // ==> 1. EDIT THIS: Use your Docker Hub username
        DOCKER_IMAGE = "timthy45/crypto-zombies:${BUILD_NUMBER}" 
        AWS_REGION = "us-east-1" // Make sure this matches your region
        EKS_CLUSTER_NAME = "petclinic-eks-cluster" // Must match terraform/eks.tf
    }

    stages {
        stage('Checkout Code') {
            steps {
                // ==> 2. EDIT THIS: Use your project's Git URL
                git branch: 'main', url: 'https://github.com/UjjwalPardeshi/Devops_Crypto_Zombies.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // This correctly builds using the Dockerfile inside your 'project' folder
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

                    // This matches your new k8s files
                    sh "kubectl set image deployment/crypto-zombies-deployment crypto-zombies-container=${DOCKER_IMAGE}"
                }
            }
        }
    }
}
