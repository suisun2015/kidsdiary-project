 
# ES2015 (ES6)とReact Redux


まずは
```
npm install
npm run watch
```
トランスパイルが終わると「LET'S PLAY」とポップアップします。
たまにgulpによる監視ビルドが止まってることがあります。トランスパイルされてないようならgulpを再起動してください。。


Playコンフィグの
routesファイルの最下部で全てのパスをindex.scala.htmlにするようになっているのでルートを追加する場合はその上に記入してください。

以下、school側に1画面、PetListという簡単なページを追加する手順です。同じように辿って1画面を追加できればイメージが出来るはずです。
newPageという空ページを作ったのでそれをコピーして修正して作れます。
------
# チュートリアル

作成するページはサーバーアプリにログインしてないとページを表示出来ません。

適当なユーザーを作ってログインしてから進めてください。

------
## 0. PetListのフォルダーを準備する ###

/app/school/newPageをコピーして/app/school/petList という自分の作りたいページのフォルダを作る。

コピーしたフォルダのcomponents/NewPage.jsをPetList.jsに改名する。

actions/NewPageAction.jsをactions/PetListAction.jsに変える。

redcers/NewPageReducer.jsをredcers/PetListReducer.jsに変える。

重複してはいけない内容やimportを修正する。

PetListAction.jsの
```
export const RECEIVE_SOME_DATA = 'school.newPage.RECEIVE_SOME_DATA';
export const RECEIVE_DETAIL = 'school.newPage.RECEIVE_DETAIL';
```

を

```
export const RECEIVE_SOME_DATA = 'school.petList.RECEIVE_SOME_DATA';
export const RECEIVE_DETAIL = 'school.petList.RECEIVE_DETAIL';
```

に変えておく。この変数名は自由だが中の文字列は全アプリを通して重複しないようにする。

PetList.jsの内容で、

`import { requestSomeData, requestDetail } from '../actions/NewPageAction'; ` を 

`import { requestSomeData, requestDetail } from '../actions/PetListAction'; ` に変える。

`class NewPage extends Component {` を 

`class PetList extends Component {` に変える。

一番下の行の

`export default connect(state => state.newPage)(NewPage);` を

`export default connect(state => state.newPage)(PetList);` に変える。

(state.newPage の部分は動作に関わるので後で変更する)

PetListReducer.jsの中身の

` import * as acts from '../actions/NewPageAction';` を

`import * as acts from '../actions/PetListAction';` に変える。

これで1ページ分のフォルダーは完成。

##  1. routes.jsに記入
まずPetListコンポーネントを表示するルート（ブラウザのURLパス）を追加。
/app/school/SchoolRoutes.jsに以下のように追記する。

```
import PetList from './petList/components/PetList';
略
export default (
  <Route>
    <Route path="/" component={RootComponent}>
      略
      <Route path="/s/petList" component={PetList}/>
略
```
これで 「http://localhost:9000/s/petList」にアクセスするとnewPageと同じように表示される。
表示に使うデータがnewPageのままなので内容も同じになる。

「control + h」を押すとデバッグ用のパネルが出てアプリのデータが見れる。state以下がデータストアになるがpetListに関するものはまだ無い。

## 2. reducerとcomponentsを繋げる

app/school/SchoolReducers.jsに以下のように追記する。
```
import petList from './petList/reducers/PetListReducer';
略
const SchoolReducers = {
  petList,
  ...略
```
petListというデータストア（ストレージ？）を追加する、くらいのイメージ。

components/PetList.jsの最後の行の

```
export default connect(state => state.newPage)(PetList);
```
を
```
export default connect(state => state.petList)(PetList);
```
に変える。

これで開き直し、「control + h」で確認するとstateにpetListがあるのが分かる。

## 3. サーバーと通信して表示を更新をする
どのような仕組みでテーブルが表示されてるかを辿る。
少しずつ変数名を変えたりconsole.logで表示して確認しよう。

ComponentDidMount()でサーバーにデータを要求。これはページ描画直後に呼ばれる。

```dispatch(requestSomeData());```の部分のrequestSomeData()はactionとしてPetListActionに定義している。

requestSomeDataをrequestPetListなど適切な名前に変えてみよう。

## 4. PetListActions.jsの説明

actionsのrequest○○は非同期通信を行うように作っている。
といっても変える部分はurlとpostするデータだけのはず。urlを'/api/school/pet_list'にしたり 送るデータを変えてみよう。

receive〇〇では新しいデータをアプリにセットする、というイメージ。
```
{
 type: XXXXX_XXXX,
 data
}
```
という定型的なオブジェクトを返すように作る。

このXXXX_XXXX部分はアプリに何が起きたのか通知する部分。アプリ内で唯一の重複しない文字列として定義する。
dataは変化したデータをそのまま渡す。この形でなければならないわけでは無いが、決め事のようなもの。

画面で通信する種類の分だけrequest〇〇とreceive〇〇、action typeの文字列定数が増えるような感じ。
action typeをRECEIVE_PET_LISTなど適切な名前に変えてみよう。

## 5. PetListReducer.jsの説明

actionはアプリ全体に何が起こったのか通知、reducerはそれによってアプリのstateを変化させる。
全アプリに通知されるのでPetListに関係するもののときだけstateの変化を実行するように作っている。
この辺はpubsubをイメージすると分かるかもしれない。

import でPetListActionの定数を読み込んでいるのでswitch文でPetListのアクションだった場合だけ、
```
{
  ...state,
  someData: data
}
```
などを返している。

```...state``` はその他、くらいのイメージ。

```someData: data``` someDataに新しいdataを入れることでアプリのstateが変化する。

stateとビューが密接に結びついていてstateが変わればビューも自動的に更新される。

PetListのstateのデータの持ち方は```initialState```として定義した。この形のデータをビュー(component)が解釈して表示するように作っている。

データの持ち方をpetListやpetsなど適当な感じに変えてみよう。

## 6. Componentを修正
reducerで返されたstateで表示更新する（自動的）。

render()メソッド内で```this.props```をconsole.logに表示してみるとreducerで返されたデータがあるのが分かるはず。

あとはhtmlタグを書きながら
```{someData.list.map((data, i) => { ...```
のようにデータを表示していくように作れる。

## ちょっとまとめ
このようにFluxという考え方では円のようなデータの流れと表示更新を行う。

どこから作り始めるか難しいので既に完成した円をコピーして各部を修正しながら新しいページとして作るのがイメージしやすいのではないかと思う。

# action.type 被り問題 #
exportする変数名は以下のようにして同じでも問題ありません（異なるファイルからのエクスポートなら区別できる）。
ただし中の文字列はアプリ全体でユニークである必要があります。文字列には機能名を含めるなどのルールで重複を避ければ問題になることは無いはずです。

機能A
-- TodoActions.js --
```
#!javascript
export const REQUEST_POST = 'REQUEST_POST.TodoList';
export const RECEIVE_POST = 'RECEIVE_POST.TodoList';
```

-- TodoReducer.js --
```
#!javascript
import * as actsA from '../actions/TodoActions';

export default function todoList(state = { info: '', todos: [] }, action = {}) {
  switch (action.type) {
    case actsA.REQUEST_POST:
...
```

機能B
-- LoginActions.js --
```
#!javascript
export const REQUEST_POST = 'REQUEST_POST.Login';
export const RECEIVE_POST = 'RECEIVE_POST.Login';
```

-- LoginReducer.js --
```
#!javascript
import * as actsB from '../actions/LoginActions';

export default function auth(state = { auth: { token: '' } }, action = {}) {
  switch (action.type) {
    case actsB.RECEIVE_POST:
...
```

# ブックマークが使えないと色々と不便 #

URLにパラメータを含める、URLのパラメータを使う
Rest風にURLに含める場合、Routeを以下のように設定します。
```
<Route path="/crawler/jobSite/show/:siteId" component={JobSiteView}/>
```
component では this.props.siteId に入ります。
```
const { params:{siteId} } = this.props;
```
で使えます。

URLのGetパラメータは、Routesに何もしないでも
```
const { query } = this.props.location;
```
で取れます。

画面内の操作でURLにパラメータを追加してデータを取得、画面の内容も更新したい
画面内の検索ボタンを押した場合など、表示済みの画面内の操作でURLを変更してデータを取得、画面の内容も更新するには、
ajaxリクエストの他にredux-routerのpushState（あるいは replaceState）というアクションを使います。
```
import { push } from 'react-router-redux'
```
検索ボタンのonClickでは、pushStateのみdispatchします。（ボタンのクリックではajax通信はしない）。
GetパラメータをつけてブラウザのHistoryを一つ進めます。
「/mailGate/list」から「/mailGate/list?text=abcd」への移動ではroutesが同じなのでComponentの再描画は行われません。
```
dispatch(push('/mailGate/list', { text }));
```
2つ目の引数はURLのパラメータです。文字列ではなく{ text: "abcd" }というオブジェクトを渡すと"?text=abcd"のように付きます。
（/mailGate/list から /mailGate/list?text=abcd に移動）（←嘘かも？）

データ更新はcomponentの componentDidUpdate(prevProps) というハンドラで行うようにします。
フェッチデータの例がありました。（最初のデータ取得はコンストラクタではなくcomponentDidMountで行うのが良いようです)。
[https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ComponentLifecycle.md#fetching-data](https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ComponentLifecycle.md#fetching-data)
重要なのはループしないようにprevPropsのlocationと新しいpropsのlocationを比較してからデータ更新を行うようにすることです。
当然queryに応じたajaxリクエストを出します。(apiに出すパラメータと同じにしておくと
```
componentDidUpdate(prevProps) {
  const { dispatch, location } = this.props;
  if( location !== prevProps.location) {
    const { query } = this.props.location;
    dispatch(requestData(0, this.limit, query))
  }
}
```
以上です