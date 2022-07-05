FROM python:latest

WORKDIR /python

ADD python python

RUN pip install -r /python/requirements.txt

CMD python /python/main.py
