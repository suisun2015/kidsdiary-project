
function recreate_db() {
  mysqladmin -uroot drop kids_diary
  sleep 0.3
  mysqladmin -uroot create kids_diary
  sleep 0.3
}

function init_alter_db() {
  mysql -uroot kids_diary < ../KidsDiary_erm/db_dump/0822_1.sql
  sleep 0.1
  mysql -uroot kids_diary < ../KidsDiary_erm/db_alter/alter0824_1.sql
  sleep 0.1
}

function test_app() {
  ./activator 'testOnly RestApiTest1'
  ./activator 'testOnly RestApiTest2'
  ./activator 'testOnly RestApiTest3'
  ./activator 'testOnly RestApiTest4'
  ./activator 'testOnly RestApiTest5'
}

 recreate_db
 init_alter_db
 test_app


