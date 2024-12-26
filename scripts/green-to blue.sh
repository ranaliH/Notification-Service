#!/bin/bash
kubectl apply -f green-deployment.yaml
kubectl set image deployment/notification-service-green notification-service=ranaliw/notification-service:${GITHUB_SHA} --record
