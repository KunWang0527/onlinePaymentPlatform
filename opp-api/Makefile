HOST_PORT=8000
CNTR_PORT=8000
TAG=v1.0
NAME=new_cors
REPO_HOST=183285131464.dkr.ecr.us-east-2.amazonaws.com/opp-app
TAGGED_IMAGE=$(REPO_HOST):$(TAG)

hello:
	@echo "Hello, thank you for using opp-app!"

image: Dockerfile
	docker build --platform linux/amd64 -t .
	@echo "DONE"

run-app-local:
	docker run -p 8000:8000 $(NAME)

stop-app:
	docker stop $(NAME)

rm-app:
	docker rm $(NAME)

ecr-login:
	aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin $(REPO_HOST)

ecr-logout:
	docker logout $(REPO_HOST)

prod-image: ecr-login image
	docker tag .:$(TAG) $(TAGGED_IMAGE)
	docker push $(TAGGED_IMAGE)
