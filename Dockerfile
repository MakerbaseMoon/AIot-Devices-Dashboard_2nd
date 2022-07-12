FROM python:latest

ENV PYTHONUNBUFFERED=1

WORKDIR /python

ADD python/requirements.txt /python/requirements.txt

RUN /bin/bash -c "/usr/local/bin/python -m pip install --upgrade pip && pip install -r /python/requirements.txt"
