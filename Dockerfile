FROM hugomods/hugo:0.131.0

COPY . /src/

EXPOSE 1313

ENTRYPOINT ["hugo", "server", "--bind", "0.0.0.0", "--port", "1313", "-D", "-F"]