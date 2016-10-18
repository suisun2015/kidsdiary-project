
テスト実行は `activator 'testOnly RestApiTest1'`で行う。activator test だとエラーがたくさん出る。

* テストケースの追加
`/test/resource/test.csv`に１行追加する。

csvの編集にはLibreOfficeを使うことにする。ダブルクォートのエスケープを自動でやってくれるし内容に改行を含めても見やすいのでこれを使う。テキストエディタだけでCSVに改行入れながら、ダブルクォートをエスケープしながらJsonを入力するのはヒドく大変だが、LibreOfficeを使えば単純なスプレッドシートだけでテストケースが書けるようになる。LibreOfficeを入れた直後はダブルクォートを普通に入力すると純粋な半角のダブルクォートでないものが入るので以下の設定が必要になる。
```
[Tools] -> [AutoCorrect Options] -> [Localized Options]
Double Quotes のReplaceのチェックを外す。
```
その他、保存の際にCsv形式のままで良いか確認しないとかオートスペルチェックとか幾つか設定を変えても良い。

テスト用のCsvは、
メソッド名、URL、POSTデータ、正しいレスポンスデータ、という順。
GETの場合はPOSTデータは無視されるので空文字などを入れておく。
APIは基本的にJsonを投げてJsonを返すものなのでそのつもりで作っている。たまにステータスコードのみのものもある。
正しいレスポンスデータの所に`show`を入れておくと実行時にコンソールにレスポンスデータを表示する。

例（test.csv）
```
POST, http://localhost:9000/login, "{""loginName"":""scot"", ""password"":""tiger""}", show
```
実行時は
```
-----> show response -----
{
  "message": "login ok", "userToken": "xxxyyyzzz"
}
<-----
```
のように表示されるのでこれを正しいレスポンスデータとして登録するとテストできるようになる。
CSVはmoukinで読み込むのでダブルクォートでくくれば改行を含めることができる。データ内のダブルクォートを入れるには２重にする。

* 依存性のあるテストシナリオについて
APIの戻り値を変数に代入することができる。
たとえば次のシナリオを考える。
アカウント作成API→ランダムなUserIDが返される。（値をテストしたくない）
上で作ったアカウントでログインAPI→登録した情報と共にランダムなUserTokenを返す。
ログインで返ってきたUserTokenを使って個人情報取得のAPI→レスポンスデータをテストする。
この場合のCSVは以下のようにする。
```
POST, http://localhost:9000/createAccount, "{""userName"": ""scott"", ""password"": ""tiger""}", "{ ""userID"": ""$userID"" }"
POST, http://localhost:9000/login, "{""userName"": ""scot"", ""password"": ""tiger""}", "{ ""userToken"": ""$userToken"" }"
POST, http://localhost:9000/api/profile, "{""userToken"": ""$userToken""}", "{ ""userName"":""scott"" }"
```
この例ではcreateAccountで新しいユーザーscottを作成し、戻り値のuserIDは変数`$userID`に代入される。
loginでscott/tigerでログインして戻り値のuserTokenを変数`$userToken`に代入する。
api/profileでは変数`$userToken`を使ってプロフィールの取得を行い、戻り値をテストしている。
当然変数名はCSV中でユニークであるべき。

