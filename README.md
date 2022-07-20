# AIot-Devices-Dashboard_2nd
物聯網即時監控網站 從前端設計到後端開發 第二代<br>
AIot Devices Dashboard 2nd

* Group: 望月智聯網研究團隊
* Member: [jlhsu666](https://github.com/jlhsu666), [Hsun1031](https://github.com/Hsun1031), [Reaxoh](https://github.com/Reaxoh)

## file project files (專案檔案)
|--ESP32<br>
|  |<br>
|  |--.devcontainer<br>
|  |--.vscode<br>
|  |--main<br>
|  |  |- CMakeLists.txt<br>
|  |  |- app_http.c<br>
|  |  |- app_http.h<br>
|  |  |- app_wifi.c<br>
|  |  |- app_wifi.h<br>
|  |  |- component.mk<br>
|  |  |- key.h<br>
|  |  |- main.c<br>
|  |  |- module_dht11.c<br>
|  |  |- module_dht11.h<br>
|  |  |- pin.h<br>
|  |<br>
|  |- CMakeLists.txt<br>
|  |- Makefile<br>
|  |- sdkconfig<br>
|  <br>
|--python<br>
|  |--esp32<br>
|  |  |- __init__.py<br>
|  |  |- view.py<br>
|  |<br>
|  |--static<br>
|  |  |--css<br>
|  |  |--img<br>
|  |  |--js<br>
|  |  |- favicon.ico<br>
|  |<br>
|  |--templates<br>
|  |  |- home.html<br>
|  |  |- login.html<br>
|  |  |- notFound.html<br>
|  |<br>
|  |- main.py<br>
|  |- requirements.txt<br>
|<br>
|- .gitignore<br>
|- Dockerfile<br>
|- README.md --> THIS FILE<br>
|- docker-compose.yml<br>

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
