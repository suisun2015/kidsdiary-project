name := """kids-diary"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  // javaWs,
  javaJpa
)

// fix issue https://groups.google.com/forum/#!topic/play-framework/9utj-Xtv8SU
libraryDependencies += "com.typesafe.netty" % "netty-reactive-streams-http" % "1.0.6"

libraryDependencies += "junit" % "junit" % "4.12" % "test"
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.38"
libraryDependencies += "org.mariadb.jdbc" % "mariadb-java-client" % "1.4.2"


// http://mvnrepository.com/artifact/org.apache.commons/commons-lang3
libraryDependencies += "org.apache.commons" % "commons-lang3" % "3.4"
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.38"
libraryDependencies += "org.mariadb.jdbc" % "mariadb-java-client" % "1.4.2"
libraryDependencies += "io.jsonwebtoken" % "jjwt" % "0.6.0"

// https://projectlombok.org/
// http://aoking.hatenablog.jp/entry/2013/07/31/122305
libraryDependencies += "org.projectlombok" % "lombok" % "1.16.8"

// http://mvnrepository.com/artifact/com.ning/async-http-client
libraryDependencies += "com.ning" % "async-http-client" % "1.9.38"

// http://mvnrepository.com/artifact/org.pacesys/openstack4j-core
libraryDependencies += "org.pacesys" % "openstack4j-core" % "3.0.0"

// http://mvnrepository.com/artifact/org.pacesys.openstack4j.connectors/openstack4j-jersey2
libraryDependencies += "org.pacesys.openstack4j.connectors" % "openstack4j-jersey2" % "3.0.0"

// http://mvnrepository.com/artifact/com.google.zxing/core
libraryDependencies += "com.google.zxing" % "core" % "3.2.1"

// https://mvnrepository.com/artifact/org.apache.poi/poi-ooxml
libraryDependencies += "org.apache.poi" % "poi-ooxml" % "3.14"

// https://mvnrepository.com/artifact/net.coobird/thumbnailator
libraryDependencies += "net.coobird" % "thumbnailator" % "0.4.8"

// https://mvnrepository.com/artifact/com.google.firebase/firebase-server-sdk
libraryDependencies += "com.google.firebase" % "firebase-server-sdk" % "3.0.1"

// https://mvnrepository.com/artifact/com.whalin/Memcached-Java-Client
libraryDependencies += "com.whalin" % "Memcached-Java-Client" % "3.0.2"

libraryDependencies += "com.github.maricn" % "logback-slack-appender" % "1.1.0"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
//routesGenerator := InjectedRoutesGenerator

packageName in Universal := "KidsDiary_app_dist"