# AIot-Devices-Dashboard_2nd
物聯網即時監控網站 從前端設計到後端開發 第二代<br>
AIot Devices Dashboard 2nd

* Group: 望月智聯網研究團隊
* Member: [jlhsu666](https://github.com/jlhsu666), [Hsun1031](https://github.com/Hsun1031), [Reaxoh](https://github.com/Reaxoh)

## file project files (專案檔案)
```
|--ESP32
|  |
|  |--.devcontainer
|  |--.vscode
|  |--main
|  |  |- CMakeLists.txt
|  |  |- app_http.c
|  |  |- app_http.h
|  |  |- app_wifi.c
|  |  |- app_wifi.h
|  |  |- component.mk
|  |  |- key.h
|  |  |- main.c
|  |  |- module_dht11.c
|  |  |- module_dht11.h
|  |  |- pin.h
|  |
|  |- CMakeLists.txt
|  |- Makefile
|  |- sdkconfig
|  
|--python
|  |--esp32
|  |  |- __init__.py
|  |  |- view.py
|  |
|  |--static
|  |  |--css
|  |  |--img
|  |  |--js
|  |  |- favicon.ico
|  |
|  |--templates
|  |  |- home.html
|  |  |- login.html
|  |  |- notFound.html
|  |
|  |- main.py
|  |- requirements.txt
|
|- .gitignore
|- Dockerfile
|- README.md --> THIS FILE
|- docker-compose.yml
```

## ubuntu server (Ubuntun 伺服器)
```
sudo apt install –y docker.io docker-compose openssh-server python3-pip
sudo usermod –aG docker user
sudo usermod –aG dialout user
```

## local vscode Extensions (本地端 vscode 插件)
- [VS Code Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

## Remote vscode Extensions (遠端 vscode 插件)
- [Espressif IDF](https://marketplace.visualstudio.com/items?itemName=espressif.esp-idf-extension)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

## heroku container (heroku 容器上傳)
```
heroku container:login
heroku container:push web
heroku container:release web
```
