FROM python:latest

WORKDIR /python

ADD python/ /python/

RUN /bin/bash -c "/usr/local/bin/python -m pip install --upgrade pip && pip install -r /python/requirements.txt"

CMD python /python/main.py
