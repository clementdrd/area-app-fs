FROM python
WORKDIR /
COPY . .
RUN pip install -r requirement.txt
CMD ["python", "manage.py", "runserver","0.0.0.0:8080"]