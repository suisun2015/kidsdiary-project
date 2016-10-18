# Macでの環境構築方法 #

### 1.1 homebrewのインストール ###
(コマンドでbrewが実行できるなら不要)
以下を実行。
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install) " 
```
### 1.2 設定 ###
brew の設定とCaskの追加インストール。
```
brew update
brew install caskroom/cask/brew-cask
brew tap homebrew/versions
```
JDK1.8をインストールする。
```
brew cask install java
```

GitやGit用GUIのSourceTreeとか。
```
brew install git
brew cask install sourcetree
```
Play 及び　ReactJSの開発に必要なツール類。
```
brew install node
```

Nodeのライブラリをインストールする。
```
npm install
```

### 1.3 MariaDBインストールと設定 ###
```
brew install mariadb
ln -sfv /usr/local/opt/mariadb/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mariadb.plist
```

/usr/local/etc/my.cnfに以下を記述。
```
[mysqld]

lower_case_table_names = 1
character_set_server = utf8
default-storage-engine = INNODB
sql_mode="STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
explicit_defaults_for_timestamp = 1
```
MySQLの再起動と確認。
```
launchctl stop ~/Library/LaunchAgents/homebrew.mxcl.mariadb.plist
launchctl start ~/Library/LaunchAgents/homebrew.mxcl.mariadb.plist
ps aux | grep mysql
```
mysql -u root で入れることを確認して下さい（quitでMySQLから出ます）。

確認できたらスクリプトでDBにテーブルを作成します。

```
> cd <PATH_TO_>KidsDiary_erm
> sh ./replace_kids_diary.sh
```
スクリプトはDBのdrop→createを行います。最初はkids_diaryというDBが無いのでdropでエラーになりますがcreateが出来ていれば問題ありません。

## ReactJS ##

JavaScriptファイルのトランスパイルができるのを確認します。
```
> cd <PATH_TO_>KidsDiary_app
> npm install
> npm run watch
```

## 動作確認 ##
```
> cd <PATH_TO_>KidsDiary_app
> ./activator clean run
```
ブラウザで「[http://localhost:9000/](http://localhost:9000/)」にアクセスしてください。
エラー無く見れたらOKです。

以下はサーバー側開発用です。

## ER図設計 ##
DBテーブルの設計にMySqlWorkbenchを使い、JPAのEbeanエンティティの自動生成にEclipseのJPAプロジェクトを使います。

```
brew cask install eclipse-jee
brew cask install mysqlworkbench
```
## JPAプロジェクト ##
MySqlWorkbenchで作ったSQLを実行しテーブル作成　→　JPAプロジェクトでテーブルからJavaコードを生成、の順にしようと思います。
テーブル構成の変更が必要になるまでしなくても良いです。

DB周りは分かってきたら色々修正するかも。
Eclipseから「*File/Import/General/Existing project…* 」でKidsDiary_jpaのフォルダを選びます。
Javaコードの生成方法はWiki参照。


## 開発ツール（IDE）セットアップ ##
eclipseでもintellijでも開発できます。
intellijの場合は
```
brew cask install intellij-idea-ce
```
intellijを開いて、「*File/Open*」でKidsDiary_appのbuild.sbtを選択し、「Use auto-import」と「Download sources and docs」を選択してOK。

eclipseの場合は
```
> cd <PATH_TO_>KidsDiary_app
> sbt
...
[kids-diary] eclipse
```
としてEclipseから「*File/Import/General/Existing project…* 」でKidsDiary_appのフォルダを選びます。
使い慣れてる方で良いのかもしれません。