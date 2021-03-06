<!--
# Add navigation with routing
-->
# 네비게이션 추가하기

<!--
There are new requirements for the Tour of Heroes app:

* Add a *Dashboard* view.
* Add the ability to navigate between the *Heroes* and *Dashboard* views.
* When users click a hero name in either view, navigate to a detail view of the selected hero.
* When users click a *deep link* in an email, open the detail view for a particular hero.

<div class="alert is-helpful">

  For the sample application that this page describes, see the <live-example></live-example>.

</div>

When you’re done, users will be able to navigate the application like this:

<div class="lightbox">
  <img src='generated/images/guide/toh/nav-diagram.png' alt="View navigations">
</div>
-->
히어로들의 여행 앱에 새로운 요구사항이 생겼습니다:

* *대시보드* 화면을 추가해야 합니다.
* *히어로 목록* 화면과 *대시보드* 화면을 전환하는 기능이 필요합니다.
* 사용자가 화면에서 히어로 이름을 클릭하면 선택된 히어로의 상세정보 화면으로 이동해야 합니다.
* 사용자가 이메일로 받은 *딥 링크(deep link)*를 클릭하면 해당 히어로의 상세정보 화면을 바로 표시해야 합니다.

<div class="alert is-helpful">

  이 문서에서 설명하는 앱은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>

그래서 최종 결과물은 다음과 같이 3개의 화면을 이동하면서 동작해야 합니다:

<div class="lightbox">
  <img src='generated/images/guide/toh/nav-diagram.png' alt="View navigations">
</div>


<!--
## Add the `AppRoutingModule`
-->
## `AppRoutingModule` 생성하기

<!--
In Angular, the best practice is to load and configure the router in a separate, top-level module
that is dedicated to routing and imported by the root `AppModule`.

By convention, the module class name is `AppRoutingModule` and it belongs in the `app-routing.module.ts` in the `src/app` folder.

Use the CLI to generate it.

<code-example language="sh">
  ng generate module app-routing --flat --module=app
</code-example>

<div class="alert is-helpful">

`--flat` puts the file in `src/app` instead of its own folder.<br>
`--module=app` tells the CLI to register it in the `imports` array of the `AppModule`.
</div>

The generated file looks like this:

<code-example path="toh-pt5/src/app/app-routing.module.0.ts" header="src/app/app-routing.module.ts (generated)">
</code-example>

Replace it with the following:

<code-example path="toh-pt5/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts (updated)">
</code-example>

First, the `app-routing.module.ts` file imports `RouterModule` and `Routes` so the application can have routing functionality. The next import, `HeroesComponent`, will give the Router somewhere to go once you configure the routes.

Notice that the `CommonModule` references and `declarations` array are unnecessary, so are no
longer part of `AppRoutingModule`. The following sections explain the rest of the `AppRoutingModule` in more detail.
-->
Angular에서는 최상위 모듈과 같은 계층에 별개의 모듈을 두고 이 모듈에 애플리케이션 최상위 라우팅 모듈을 정의하는 방법을 권장합니다.
`AppModule`은 이렇게 정의한 라우팅 설정을 로드해서 사용하기만 하면 됩니다.

일반적으로 애플리케이션 최상위 라우팅을 담당하는 모듈의 클래스 이름은 `AppRoutingModule`이라고 정의하며 `src/app` 폴더에 `app-routing.module.ts` 파일로 생성합니다.

Angular CLI로 다음 명령을 실행해서 라우팅 모듈을 만들어 봅시다.

<code-example language="sh">
  ng generate module app-routing --flat --module=app
</code-example>

<div class="alert is-helpful">

`--flat` 옵션을 사용하면 새로운 폴더를 만들지 않고 `src/app` 폴더에 파일을 생성합니다.<br>
`--module=app` 옵션을 사용하면 Angular CLI가 이 라우팅 모듈을 `AppModule`의 `imports` 배열에 자동으로 추가합니다.

</div>

이 명령을 실행해서 만든 파일의 내용은 다음과 같습니다:

<code-example path="toh-pt5/src/app/app-routing.module.0.ts" header="src/app/app-routing.module.ts (기본 생성 코드)">
</code-example>

이 내용을 다음과 같이 수정합니다.

<code-example path="toh-pt5/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts (수정된 코드)">
</code-example>

먼저, 라우팅 동작을 실행할 수 있도록 `app-routing.module.ts` 파일에 `RouterModule`과 `Routes` 심볼을 로드합니다.
그리고 라우팅 규칙에 따라 이동할 `HeroesComponent`를 로드합니다.

`CommonModule`을 로드했던 부분이나 `declarations` 배열은 필요없기 때문에 `AppRoutingModule`에서 제거했습니다.
변경된 나머지 부분에 대해서는 다음 섹션부터 자세하게 알아봅시다.



<!--
### Routes
-->
### 라우팅 규칙(Route)

<!--
The next part of the file is where you configure your routes.
*Routes* tell the Router which view to display when a user clicks a link or
pastes a URL into the browser address bar.

Since `app-routing.module.ts` already imports `HeroesComponent`, you can use it in the `routes` array:

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts"
  region="heroes-route">
</code-example>

A typical Angular `Route` has two properties:

* `path`: a string that matches the URL in the browser address bar.
* `component`: the component that the router should create when navigating to this route.

This tells the router to match that URL to `path: 'heroes'`
and display the `HeroesComponent` when the URL is something like `localhost:4200/heroes`.
-->
새롭게 만든 파일에서는 라우팅 규칙을 정의하는 부분도 변경되었습니다.
*라우팅 규칙*은  사용자가 링크를 클릭하거나 브라우저 주소표시줄에 URL을 직접 입력했을 때 라우터가 어떤 화면을 표시할지 정의한 것입니다.

이전 섹션에서 로드했던 `HeroesComponent`를 라우팅 규칙으로 등록하려면 `routes` 배열을 다음과 같이 작성하면 됩니다:

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts"
  region="heroes-route">
</code-example>

`Route`는 보통 두 개의 프로퍼티를 사용합니다:

* `path`: 브라우저 주소표시줄에 있는 URL과 매칭될 문자열을 지정합니다.
* `component`: 라우터가 생성하고 화면에 표시할 컴포넌트를 지정합니다.

이제 라우터가 `path: 'heroes'`에 해당하는 URL을 만나면 `localhost:4200/heroes`와 같은 URL로 이동하면서 `HeroesComponent`를 표시할 수 있습니다.


### `RouterModule.forRoot()`

<!--
The `@NgModule` metadata initializes the router and starts it listening for browser location changes.

The following line adds the `RouterModule` to the `AppRoutingModule` `imports` array and
configures it with the `routes` in one step by calling
`RouterModule.forRoot()`:

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="ngmodule-imports">
</code-example>

<div class="alert is-helpful">

  The method is called `forRoot()` because you configure the router at the application's root level.
  The `forRoot()` method supplies the service providers and directives needed for routing,
  and performs the initial navigation based on the current browser URL.

</div>

Next, `AppRoutingModule` exports `RouterModule` so it will be available throughout the application.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (exports array)" region="export-routermodule">
</code-example>
-->
`@NgModule`에 메타데이터를 지정하면 모듈이 생성될 때 라우터를 초기화하면서 브라우저의 주소가 변화되는 것을 감지합니다.

그래서 `AppRoutingModule`에도 라우터를 초기화하기 위해 `imports` 배열에 `RouterModule`을 등록해야 하는데, 이 때 `RouterModule.forRoot()` 메소드에 `routes` 인자를 넣어서 실행한 결과를 지정합니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="ngmodule-imports">
</code-example>

<div class="alert is-helpful">

  애플리케이션 최상위 계층에 존재하는 라우터를 설정할 때는 `forRoot()` 메소드를 사용합니다.
  `forRoot()` 메소드를 사용하면 라우팅과 관련된 서비스 프로바이더와 디렉티브를 애플리케이션에 제공할 수 있으며, 브라우저에서 변경되는 URL을 감지할 수 있습니다.

</div>

그리고 앱에서도 `RouterModule`을 사용할 수 있도록 `AppRoutingModule`의 `exports` 배열을 다음과 같이 지정합니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (exports 배열)" region="export-routermodule">
</code-example>


<!--
## Add `RouterOutlet`
-->
## 라우팅 영역 (`RouterOutlet`) 추가하기


<!--
Open the `AppComponent` template and replace the `<app-heroes>` element with a `<router-outlet>` element.

<code-example path="toh-pt5/src/app/app.component.html" region="outlet" header="src/app/app.component.html (router-outlet)">
</code-example>

The `AppComponent` template no longer needs `<app-heroes>` because the application will only display the `HeroesComponent` when the user navigates to it.

The `<router-outlet>` tells the router where to display routed views.

<div class="alert is-helpful">

The `RouterOutlet` is one of the router directives that became available to the `AppComponent`
because `AppModule` imports `AppRoutingModule` which exported `RouterModule`. The `ng generate` command you ran at the start of this tutorial added this import because of the `--module=app` flag. If you manually created `app-routing.module.ts` or used a tool other than the CLI to do so, you'll need to import `AppRoutingModule` into `app.module.ts` and add it to the `imports` array of the `NgModule`.

</div>
-->
`AppComponent` 템플릿을 열어서 `<app-heroes>` 엘리먼트를 `<router-outlet>` 엘리먼트로 변경합니다.

<code-example path="toh-pt5/src/app/app.component.html" region="outlet" header="src/app/app.component.html (router-outlet)">
</code-example>

`AppComponent` 템플릿에는 더이상 `<app-heroes>` 컴포넌트가 존재하지 않습니다. 이 컴포넌트는 이제 사용자의 네비게이션의 의해 화면에 표시됩니다.

`<router-outlet>`은 라우팅 된 화면이 표시될 위치를 지정하는 엘리먼트입니다.

<div class="alert is-helpful">

`RouterOutlet` 디렉티브는 `AppComponent`에서도 사용할 수 있습니다.
왜냐하면 `AppModule`이 로드하고 있는 `AppRoutingModule`이 `RouterModule`을 외부로 공개하고 있기 때문입니다.
이 동작은 프로젝트를 생성하는 `ng generate` 명령을 실행하면서 `--module=app` 플래그를 지정했기 때문에 자동으로 추가된 것입니다.
`app-routing.module.ts` 파일을 직접 생성했거나 Angular CLI 외의 툴을 사용했다면 `app.module.ts` 파일에서 `AppRoutingModule`을 로드하고 `NgModule`의 `imports` 배열에 이 라우팅 모듈을 추가하면 됩니다.

</div>


<!--
#### Try it
-->
#### 동작 확인하기

<!--
You should still be running with this CLI command.

<code-example language="sh">
  ng serve
</code-example>

The browser should refresh and display the application title but not the list of heroes.

Look at the browser's address bar.
The URL ends in `/`.
The route path to `HeroesComponent` is `/heroes`.

Append `/heroes` to the URL in the browser address bar.
You should see the familiar heroes master/detail view.

Remove `/heroes` from the URL in the browser address bar.
The browser should refresh and display the application title but not the list of heroes.
-->
Angular CLI로 다음 명령을 실행해서 애플리케이션을 실행합니다.

<code-example language="sh">
  ng serve
</code-example>

브라우저가 갱신되면 애플리케이션 제목은 표시되지만 히어로의 목록은 표시되지 않습니다.

이 때 브라우저의 주소표시줄을 확인해 보세요.
URL은 `/`로 끝납니다.
`HeroesComponent`는 라우팅 경로 `/heroes`에 연결되어 있기 때문에 이 주소에서 히어로 목록이 표시되지 않는 것입니다.

브라우저 주소표시줄의 URL을 `/heroes`로 변경해 보세요.
그러면 이전과 같이 히어로의 목록이 표시될 것입니다.

Remove `/heroes` from the URL in the browser address bar.
The browser should refresh and display the application title but not the list of heroes.


{@a routerlink}

<!--
## Add a navigation link (`routerLink`)
-->
## 네비게이션 링크 (`routerLink`) 추가하기

<!--
Ideally, users should be able to click a link to navigate rather
than pasting a route URL into the address bar.

Add a `<nav>` element and, within that, an anchor element that, when clicked,
triggers navigation to the `HeroesComponent`.
The revised `AppComponent` template looks like this:

<code-example path="toh-pt5/src/app/app.component.html" region="heroes" header="src/app/app.component.html (heroes RouterLink)">
</code-example>

A [`routerLink` attribute](#routerlink) is set to `"/heroes"`,
the string that the router matches to the route to `HeroesComponent`.
The `routerLink` is the selector for the [`RouterLink` directive](/api/router/RouterLink)
that turns user clicks into router navigations.
It's another of the public directives in the `RouterModule`.

The browser refreshes and displays the application title and heroes link,
but not the heroes list.

Click the link.
The address bar updates to `/heroes` and the list of heroes appears.

<div class="alert is-helpful">

Make this and future navigation links look better by adding private CSS styles to `app.component.css`
as listed in the [final code review](#appcomponent) below.

</div>
-->
사용자가 브라우저 주소표시줄에 원하는 URL을 입력해야만 하는 것은 좋은 방법이 아닙니다.
이 방법보다는 네비게이션을 실행하는 링크를 클릭하는 방법이 더 편할 것입니다.

이번에는 앵커(`<a>`) 엘리먼트를 추가하고, 사용자가 이 엘리먼트를 클릭했을 때 `HeroesComponent`로 이동하도록 해봅시다.
`AppComponent`의 템플릿을 다음과 같이 수정합니다.

<code-example path="toh-pt5/src/app/app.component.html" region="heroes" header="src/app/app.component.html (히어로 목록으로 이동하는 RouterLink)">
</code-example>

`routerLink`는 `RouterModule`이 제공하는 [`RouterLink` 디렉티브](#routerlink)이며, 사용자가 이 디렉티브가 적용된 엘리먼트를 클릭하면 네비게이션을 실행합니다.
그리고 [`routerLink` 어트리뷰트](#routerlink)의 값은 `"/heroes"`로 할당되었는데, 이 문자열은 `HeroesComponent`에 해당하는 라우팅 경로를 의미합니다.

이제 브라우저가 갱신되면 애플리케이션 제목과 히어로 목록으로 가는 링크가 표시되지만 히어로의 목록은 여전히 표시되지 않습니다.

링크를 클릭해 보세요.
주소표시줄의 URL이 `/heroes`로 바뀌면서 히어로 목록이 표시될 것입니다.

<div class="alert is-helpful">

`app.component.css` 파일에 CSS 스타일을 작성하면 네비게이션 링크를 더 보기 좋게 표시할 수 있습니다.
이 내용은 [최종코드 리뷰](#appcomponent)에서 확인할 수 있습니다.

</div>


<!--
## Add a dashboard view
-->
## 대시보드 화면 추가하기

<!--
Routing makes more sense when there are multiple views.
So far there's only the heroes view.

Add a `DashboardComponent` using the CLI:

<code-example language="sh">
  ng generate component dashboard
</code-example>

The CLI generates the files for the `DashboardComponent` and declares it in `AppModule`.

Replace the default file content in these three files as follows:

<code-tabs>
  <code-pane
    header="src/app/dashboard/dashboard.component.html" path="toh-pt5/src/app/dashboard/dashboard.component.1.html">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.ts" path="toh-pt5/src/app/dashboard/dashboard.component.ts">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.css" path="toh-pt5/src/app/dashboard/dashboard.component.css">
  </code-pane>
</code-tabs>

The  _template_ presents a grid of hero name links.

* The `*ngFor` repeater creates as many links as are in the component's `heroes` array.
* The links are styled as colored blocks by the `dashboard.component.css`.
* The links don't go anywhere yet but [they will shortly](#hero-details).

The _class_ is similar to the `HeroesComponent` class.
* It defines a `heroes` array property.
* The constructor expects Angular to inject the `HeroService` into a private `heroService` property.
* The `ngOnInit()` lifecycle hook calls `getHeroes()`.

This `getHeroes()` returns the sliced list of heroes at positions 1 and 5, returning only four of the Top Heroes (2nd, 3rd, 4th, and 5th).

<code-example path="toh-pt5/src/app/dashboard/dashboard.component.ts" header="src/app/dashboard/dashboard.component.ts" region="getHeroes">
</code-example>
-->
라우터를 사용하면 여러 화면을 전환하기도 쉽습니다.
아직까지는 히어로 목록을 표시하는 화면만 있지만 이제 다른 화면을 추가해 봅시다.

Angular CLI로 다음 명령을 실행해서 `DashboardComponent`를 생성합니다.

<code-example language="sh">
  ng generate component dashboard
</code-example>

그러면 `DashboardComponent`를 구성하는 파일이 생성되면서 이 컴포넌트가 `AppModule`에 자동으로 등록됩니다.

이 컴포넌트의 내용을 다음과 같이 수정합니다:

<code-tabs>
  <code-pane
    header="src/app/dashboard/dashboard.component.html" path="toh-pt5/src/app/dashboard/dashboard.component.1.html">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.ts" path="toh-pt5/src/app/dashboard/dashboard.component.ts">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.css" path="toh-pt5/src/app/dashboard/dashboard.component.css">
  </code-pane>
</code-tabs>

이 _템플릿_ 에는 네비게이션 링크로 구성된 히어로의 이름이 그리드 형태로 배열되어 있습니다.

* 컴포넌트의 `heroes` 배열에 있는 항목을 모두 링크로 만들기 위해 `*ngFor`를 사용했습니다.
* 링크 항목의 스타일은 `dashboard.component.css`에 작성합니다.
* 아직 링크 항목들은 화면을 전환하지 않습니다. 이 내용은 [곧](#hero-details) 작성할 예정입니다.

대시보드 화면의 _클래스_ 는 `HeroesComponent` 클래스와 비슷합니다.
* `heroes` 프로퍼티를 배열로 선언합니다.
* 생성자를 통해 `HeroService`를 의존성으로 주입받고 이 객체를 `private heroService` 프로퍼티에 할당합니다.
* `HeroService`의 `getHeroes` 함수는 `ngOnInit()` 라이프싸이클 후킹 함수에서 호출합니다.

이 때 대시보드 화면의 컴포넌트 클래스에서는 `HeroService`의 `getHeroes()`로 받은 배열 데이터 중에 4개만 추출해서 `heroes` 프로퍼티에 할당합니다.

<code-example path="toh-pt5/src/app/dashboard/dashboard.component.ts" header="src/app/dashboard/dashboard.component.ts" region="getHeroes">
</code-example>


<!--
### Add the dashboard route
-->
### 대시보드 라우팅 규칙 추가하기

<!--
To navigate to the dashboard, the router needs an appropriate route.

Import the `DashboardComponent` in the `app-routing-module.ts` file.

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="import-dashboard" header="src/app/app-routing.module.ts (import DashboardComponent)">
</code-example>

Add a route to the `routes` array that matches a path to the `DashboardComponent`.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="dashboard-route">
</code-example>
-->
대시보드로 화면을 전환하려면 이 컴포넌트를 연결하는 라우팅 규칙이 필요합니다.

먼저, `app-routing-module.ts` 파일에 `DashboardComponent`를 로드합니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="import-dashboard" header="src/app/app-routing.module.ts (import DashboardComponent)">
</code-example>

그리고 `routes` 배열에 `DashboardComponent`에 해당하는 라우팅 규칙을 추가합니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="dashboard-route">
</code-example>


<!--
### Add a default route
-->
### 기본 라우팅 규칙 추가하기

<!--
When the application starts, the browser's address bar points to the web site's root.
That doesn't match any existing route so the router doesn't navigate anywhere.
The space below the `<router-outlet>` is blank.

To make the application navigate to the dashboard automatically, add the following
route to the `routes` array.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="redirect-route">
</code-example>

This route redirects a URL that fully matches the empty path to the route whose path is `'/dashboard'`.

After the browser refreshes, the router loads the `DashboardComponent`
and the browser address bar shows the `/dashboard` URL.
-->
애플리케이션이 시작되면 브라우저의 주소표시줄은 웹 사이트의 최상위 주소를 가리킵니다.
하지만 이 주소에 매칭되는 라우팅 규칙이 없기 때문에 라우터는 페이지를 이동하지 않습니다.
그래서 `<router-outlet>` 아래쪽은 빈 공간으로 남게 됩니다.

애플리케이션이 실행되면서 대시보드 화면을 자동으로 표시하려면 `routes` 배열에 다음과 같이 기본 라우팅 규칙을 추가하면 됩니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="redirect-route">
</code-example>

이 라우팅 규칙은 브라우저의 URL이 빈 문자열일 때 `'/dashboard'` 주소로 이동하도록 설정한 것입니다.

이제 브라우저가 갱신되고 나면 라우터는 브라우저 주소를 `/dashboard`로 변경하면서 `DashboardComponent`를 바로 표시합니다.


<!--
### Add dashboard link to the shell
-->
### 애플리케이션 셸에 대시보드 링크 추가하기

<!--
The user should be able to navigate back and forth between the
`DashboardComponent` and the `HeroesComponent` by clicking links in the
navigation area near the top of the page.

Add a dashboard navigation link to the `AppComponent` shell template, just above the *Heroes* link.

<code-example path="toh-pt5/src/app/app.component.html" header="src/app/app.component.html">
</code-example>

After the browser refreshes you can navigate freely between the two views by clicking the links.
-->
사용자는 페이지 위쪽 네비게이션 영역에 있는 링크를 클릭해서 `DashboardComponent`나 `HeroesComponent`로 이동할 수 있어야 합니다.

이 기능을 위해 `AppComponent` 셸의 템플릿에 대시보드로 이동할 수 있는 링크를 추가합시다.

<code-example path="toh-pt5/src/app/app.component.html" header="src/app/app.component.html">
</code-example>

브라우저가 갱신되고 나면 링크를 클릭해서 대시보드 화면과 히어로 목록 화면으로 자유롭게 이동할 수 있습니다.


{@a hero-details}
<!--
## Navigating to hero details
-->
## 히어로 상세정보 화면으로 전환하기

<!--
The `HeroDetailComponent` displays details of a selected hero.
At the moment the `HeroDetailComponent` is only visible at the bottom of the `HeroesComponent`

The user should be able to get to these details in three ways.

1. By clicking a hero in the dashboard.
1. By clicking a hero in the heroes list.
1. By pasting a "deep link" URL into the browser address bar that identifies the hero to display.

In this section, you'll enable navigation to the `HeroDetailComponent`
and liberate it from the `HeroesComponent`.
-->
`HeroDetailComponent`는 사용자가 선택한 히어로의 상세정보를 표시하는 컴포넌트입니다.
그리고 지금까지 작성한 코드에서 `HeroDetailComponent`는 `HeroesComponent` 아래쪽에 표시됩니다.

사용자는 이 컴포넌트를 세가지 방법으로 사용할 수 있어야 합니다.

1. 대시보드에서 히어로를 클릭했을 때
1. 히어로 목록에서 히어로를 클릭했을 때
1. 특정 히어로에 해당하는 "딥 링크 (deep link)" URL을 브라우저 주소표시줄에 입력했을 때

이번 섹션에서는 `HeroesComponent`와 별개로 `HeroDetailComponent`로 직접 네비게이션할 수 있는 방법에 대해 알아봅시다.


<!--
### Delete _hero details_ from `HeroesComponent`
-->
### `HeroesComponent`에 포함된 _히어로 상세정보_ 제거하기

<!--
When the user clicks a hero item in the `HeroesComponent`,
the application should navigate to the `HeroDetailComponent`,
replacing the heroes list view with the hero detail view.
The heroes list view should no longer show hero details as it does now.

Open the `HeroesComponent` template (`heroes/heroes.component.html`) and
delete the `<app-hero-detail>` element from the bottom.

Clicking a hero item now does nothing.
You'll [fix that shortly](#heroes-component-links) after you enable routing to the `HeroDetailComponent`.
-->
사용자가 `HeroesComponent`에 있는 히어로 아이템을 클릭하면 `HeroDetailComponent`에 해당하는 주소로 이동하면서 화면에 표시된 컴포넌트를 변경해야 합니다.
그리고 이 경우에 히어로 목록은 더이상 화면에 표시되지 않아야 합니다.

`HeroesComponent` 템플릿 파일(`heroes/heroes.component.html`)을 열고 템플릿 아래쪽에 사용된 `<app-hero-detail>` 엘리먼트를 제거합니다.

그리고나서 히어로 항목을 선택하면 아무일도 일어나지 않습니다.
이 에러는 `HeroDetailComponent`로 라우팅하는 시나리오를 처리한 [후에](#heroes-component-links) 수정할 것입니다.


<!--
### Add a _hero detail_ route
-->
### _히어로 상세정보 화면_ 에 대한 라우팅 규칙 추가하기

<!--
A URL like `~/detail/11` would be a good URL for navigating to the *Hero Detail* view of the hero whose `id` is `11`.

Open `app-routing.module.ts` and import `HeroDetailComponent`.

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="import-herodetail" header="src/app/app-routing.module.ts (import HeroDetailComponent)">
</code-example>

Then add a _parameterized_ route to the `routes` array that matches the path pattern to the _hero detail_ view.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="detail-route">
</code-example>

The colon (:) in the `path` indicates that `:id` is a placeholder for a specific hero `id`.

At this point, all application routes are in place.

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="routes" header="src/app/app-routing.module.ts (all routes)">
</code-example>
-->
URL이 `~/detail/11`라면 이 URL은 *히어로 상세정보* 화면에서 `id`가 `11`에 해당하는 히어로의 상세정보를 표시한다는 것으로 이해할 수 있습니다.

이렇게 구현하기 위해 `app-routing.module.ts` 파일을 열어서 `HeroDetailComponent`를 로드합니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="import-herodetail" header="src/app/app-routing.module.ts (HeroDetailComponent 로드하기)">
</code-example>

그리고 `routes` 배열에 _히어로 상세정보_ 화면과 매칭되는 패턴을 _라우팅 변수를 사용해서_ 정의합니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="detail-route">
</code-example>

이렇게 정의하면 히어로의 `id`에 해당하는 라우팅 변수를 `:id`로 받겠다는 것을 의미합니다.

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="routes" header="src/app/app-routing.module.ts (전체 라우팅 규칙)">
</code-example>


<!--
### `DashboardComponent` hero links
-->
### `DashboardComponent`에서 상세정보로 가는 링크

<!--
The `DashboardComponent` hero links do nothing at the moment.

Now that the router has a route to `HeroDetailComponent`,
fix the dashboard hero links to navigate using the _parameterized_ dashboard route.

<code-example
  path="toh-pt5/src/app/dashboard/dashboard.component.html"
  region="click"
  header="src/app/dashboard/dashboard.component.html (hero links)">
</code-example>

You're using Angular [interpolation binding](guide/interpolation) within the `*ngFor` repeater
to insert the current iteration's `hero.id` into each
[`routerLink`](#routerlink).
-->
`DashboardComponent`에 추가한 링크는 아직 동작하지 않습니다.

`*ngFor`로 배열을 순회할 때 할당되는 `hero` 객체의 `id`를 활용해서 `HeroDetailComponent`로 이동하는 라우팅 규칙을 연결해 봅시다.

<code-example
  path="toh-pt5/src/app/dashboard/dashboard.component.html"
  region="click"
  header="src/app/dashboard/dashboard.component.html (hero links)">
</code-example>

이 때 `*ngFor`로 순회하는 각 링크의 [`routerLink`](#routerlink)의 값으로 `hero.id`를 지정하기 위해 Angular가 제공하는 [문자열 바인딩(interpolation binding)](guide/interpolation) 문법을 사용했습니다.


{@a heroes-component-links}
<!--
### `HeroesComponent` hero links
-->
### `HeroesComponent`에서 상세정보로 가는 링크

<!--
The hero items in the `HeroesComponent` are `<li>` elements whose click events
are bound to the component's `onSelect()` method.

<code-example path="toh-pt4/src/app/heroes/heroes.component.html" region="list" header="src/app/heroes/heroes.component.html (list with onSelect)">
</code-example>

Strip the `<li>` back to just its `*ngFor`,
wrap the badge and name in an anchor element (`<a>`),
and add a `routerLink` attribute to the anchor that
is the same as in the dashboard template

<code-example path="toh-pt5/src/app/heroes/heroes.component.html" region="list" header="src/app/heroes/heroes.component.html (list with links)">
</code-example>

You'll have to fix the private stylesheet (`heroes.component.css`) to make
the list look as it did before.
Revised styles are in the [final code review](#heroescomponent) at the bottom of this guide.
-->
`HeroesComponent`에 있는 히어로 아이템은 `<li>` 엘리먼트로 구성되었기 때문에, 이 엘리먼트에 클릭 이벤트를 바인딩하면 컴포넌트의 `onSelect()` 메소드를 실행할 수 있었습니다.

<code-example path="toh-pt4/src/app/heroes/heroes.component.html" region="list" header="src/app/heroes/heroes.component.html (onSelect가 적용된 리스트)">
</code-example>

이 코드에서 `<li>`에 적용된 어트리뷰트를 모두 제거하고 `*ngFor`만 남겨둡니다.
그리고 히어로의 id 뱃지와 이름을 표시하는 앵커 엘리먼트에 `routerLink` 어트리뷰트를 추가합니다.

<code-example path="toh-pt5/src/app/heroes/heroes.component.html" region="list" header="src/app/heroes/heroes.component.html (링크가 적용된 리스트)">
</code-example>

화면에 표시되는 모습을 변경하려면 컴포넌트의 스타일시트 파일(`heroes.component.css`)을 수정하면 됩니다.
이 문서 마지막에 있는 [최종코드 리뷰](#heroescomponent)를 확인해 보세요.


<!--
#### Remove dead code (optional)
-->
#### 필요없는 코드 제거하기 (생략 가능)

<!--
While the `HeroesComponent` class still works,
the `onSelect()` method and `selectedHero` property are no longer used.

It's nice to tidy up and you'll be grateful to yourself later.
Here's the class after pruning away the dead code.

<code-example path="toh-pt5/src/app/heroes/heroes.component.ts" region="class" header="src/app/heroes/heroes.component.ts (cleaned up)">
</code-example>
-->
`HeroesComponent`는 지금도 제대로 동작하지만 이 컴포넌트 클래스에 있는 `onSelect()` 메소드와 `selectedHero` 프로퍼티는 더이상 사용되지 않습니다.

그래서 클래스 코드를 깔끔하게 유지하려면 사용하지 않는 코드를 제거하는 것이 좋습니다.

<code-example path="toh-pt5/src/app/heroes/heroes.component.ts" region="class" header="src/app/heroes/heroes.component.ts (코드 정리 후)">
</code-example>


<!--
## Routable `HeroDetailComponent`
-->
## `HeroDetailComponent` 라우팅

<!--
Previously, the parent `HeroesComponent` set the `HeroDetailComponent.hero`
property and the `HeroDetailComponent` displayed the hero.

`HeroesComponent` doesn't do that anymore.
Now the router creates the `HeroDetailComponent` in response to a URL such as `~/detail/11`.

The `HeroDetailComponent` needs a new way to obtain the hero-to-display.
This section explains the following:

* Get the route that created it
* Extract the `id` from the route
* Acquire the hero with that `id` from the server using the `HeroService`

Add the following imports:

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" region="added-imports" header="src/app/hero-detail/hero-detail.component.ts">
</code-example>

{@a hero-detail-ctor}

Inject the `ActivatedRoute`, `HeroService`, and `Location` services
into the constructor, saving their values in private fields:

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" header="src/app/hero-detail/hero-detail.component.ts" region="ctor">
</code-example>

The [`ActivatedRoute`](api/router/ActivatedRoute) holds information about the route to this instance of the `HeroDetailComponent`.
This component is interested in the route's parameters extracted from the URL.
The "id" parameter is the `id` of the hero to display.

The [`HeroService`](tutorial/toh-pt4) gets hero data from the remote server
and this component will use it to get the hero-to-display.

The [`location`](api/common/Location) is an Angular service for interacting with the browser.
You'll use it [later](#goback) to navigate back to the view that navigated here.
-->
이전 예제에서는 부모 컴포넌트 `HeroesComponent`가 자식 컴포넌트 `HeroDetailComponent`의 `hero` 프로퍼티를 바인딩하면 자식 컴포넌트가 이 히어로에 대한 상세정보를 표시했습니다.

하지만 이제 `HeroesComponent`는 이런 동작을 하지 않습니다.
이제부터는 라우터가 `HeroDetailComponent`를 생성하는데 이 때 URL에 있는 `~/detail/11`과 같은 URL을 활용하도록 수정해 봅시다.

이제 `HeroDetailComponent`가 화면에 표시할 히어로의 id는 다음과 같이 가져옵니다.

* 컴포넌트를 생성할 때 사용한 라우팅 규칙을 참조합니다.
* 라우팅 규칙에서 `id`에 해당하는 라우팅 변수를 추출합니다.
* `id`에 해당되는 히어로 정보는 `HeroService`를 활용해서 서버에서 가져옵니다.

다음 코드를 추가합니다:

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" region="added-imports" header="src/app/hero-detail/hero-detail.component.ts">
</code-example>

{@a hero-detail-ctor}

먼저, 컴포넌트 생성자로 `ActivatedRoute`, `HeroService`, `Location` 서비스를 의존성으로 주입하고 `private` 프로퍼티로 선언합니다:

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" header="src/app/hero-detail/hero-detail.component.ts" region="ctor">
</code-example>

[`ActivatedRoute`](api/router/ActivatedRoute)는 `HeroDetailComponent`의 인스턴스를 생성하면서 적용한 라우팅 규칙에 대한 정보를 담고 있습니다.
그래서 이 라우팅 규칙을 참조하면 URL을 통해 컴포넌트로 전달되는 변수를 추출할 수 있습니다.
화면에 표시할 히어로를 구분할 때도 URL에 포함된 라우팅 변수 `id`를 사용합니다.

컴포넌트에 사용할 히어로 데이터는 [`HeroService`](tutorial/toh-pt4)를 사용해서 리모트 서버에서 가져옵니다.

[`location`](api/common/Location)은 브라우저를 제어하기 위해 Angular가 제공하는 서비스입니다.
이 서비스는 [이전 페이지로 전환하는 예제를 다룰 때](#goback) 다시 살펴봅니다.


<!--
### Extract the `id` route parameter
-->
### 라우팅 변수 `id` 추출하기

<!--
In the `ngOnInit()` [lifecycle hook](guide/lifecycle-hooks#oninit)
call `getHero()` and define it as follows.

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" header="src/app/hero-detail/hero-detail.component.ts" region="ngOnInit">
</code-example>

The `route.snapshot` is a static image of the route information shortly after the component was created.

The `paramMap` is a dictionary of route parameter values extracted from the URL.
The `"id"` key returns the `id` of the hero to fetch.

Route parameters are always strings.
The JavaScript `Number` function converts the string to a number,
which is what a hero `id` should be.

The browser refreshes and the application crashes with a compiler error.
`HeroService` doesn't have a `getHero()` method.
Add it now.
-->
지금까지 작성한 예제에서는 `ngOnInit()` [라이프싸이클 후킹 함수](guide/lifecycle-hooks#oninit)에서 `HeroService`의 `getHero()` 메소드를 호출합니다.

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" header="src/app/hero-detail/hero-detail.component.ts" region="ngOnInit">
</code-example>

`route.snapshot`은 컴포넌트가 생성된 직후에 존재하는 라우팅 규칙에 대한 정보를 담고 있는 객체입니다.

그래서 이 객체가 제공하는 `paramMap`을 사용하면 URL에 존재하는 라우팅 변수를 참조할 수 있습니다.
지금 작성하고 있는 예제에서는 서버로부터 받아올 히어로의 `id`에 해당하는 값을 URL에 있는 `"id"` 키로 참조합니다.

라우팅 변수는 언제나 문자열 타입입니다.
그래서 라우팅 변수로 전달된 값이 원래 숫자였다면 문자열로 받아온 라우팅 변수에 `Number` 함수를 사용해서 숫자로 변환할 수 있습니다.

하지만 브라우저가 갱신되고 난 후에 이 코드는 동작하지 않습니다.
왜냐하면 `HeroService`에 아직 `getHero()` 메소드가 없기 때문입니다.
이 메소드를 추가해 봅시다.


<!--
### Add `HeroService.getHero()`
-->
### `HeroService.getHero()` 추가하기

<!--
Open `HeroService` and add the following `getHero()` method with the `id` after the `getHeroes()` method:

<code-example path="toh-pt5/src/app/hero.service.ts" region="getHero" header="src/app/hero.service.ts (getHero)">
</code-example>

<div class="alert is-important">

Note the backticks ( &#96; ) that define a JavaScript
[_template literal_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) for embedding the `id`.
</div>

Like [`getHeroes()`](tutorial/toh-pt4#observable-heroservice),
`getHero()` has an asynchronous signature.
It returns a _mock hero_ as an `Observable`, using the RxJS `of()` function.

You'll be able to re-implement `getHero()` as a real `Http` request
without having to change the `HeroDetailComponent` that calls it.
-->
`HeroService`를 열고 `getHeroes()` 메소드 뒤에 다음과 같이 `getHero()` 메소드를 추가합니다.

<code-example path="toh-pt5/src/app/hero.service.ts" region="getHero" header="src/app/hero.service.ts (getHero)">
</code-example>

<div class="alert is-important">

`id`에 사용된 역따옴표( &#96; )는 [_템플릿 리터럴 (template literal)_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)을 표현하는 JavaScript 문법입니다.

</div>

`getHero()` 함수도 [`getHeroes()`](tutorial/toh-pt4#옵저버블-heroservice) 함수와 비슷하게 비동기로 동작합니다.
그리고 _히어로의 목 데이터_ 하나를 `Observable`로 반환하기 위해 RxJs가 제공하는 `of()` 함수를 사용했습니다.

이렇게 구현하면 나중에 `getHero()`가 실제 `Http` 요청을 보내도록 수정하더라도 이 함수를 호출하는 `HeroDetailComponent`는 영향을 받지 않습니다.


<!--
#### Try it
-->
### 동작 확인하기

<!--
The browser refreshes and the application is working again.
You can click a hero in the dashboard or in the heroes list and navigate to that hero's detail view.

If you paste `localhost:4200/detail/11` in the browser address bar,
the router navigates to the detail view for the hero with `id: 11`,  "Dr Nice".
-->
브라우저가 갱신되고 나면 앱이 다시 동작합니다.
그리고 대시보드나 히어로 목록 화면에서 히어로를 한 명 선택하면 이 히어로의 상세정보를 표시하는 화면으로 이동합니다.

브라우저 주소표시줄에 `localhost:4200/detail/11`라는 값을 붙여넣으면 이 때도 마찬가지로 `id: 11`에 해당하는 "Dr Nice" 히어로의 정보를 표시하는 화면으로 이동할 것입니다.

{@a goback}

<!--
### Find the way back
-->
### 이전 화면으로 돌아가기

<!--
By clicking the browser's back button,
you can go back to the hero list or dashboard view,
depending upon which sent you to the detail view.

It would be nice to have a button on the `HeroDetail` view that can do that.

Add a *go back* button to the bottom of the component template and bind it
to the component's `goBack()` method.

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.html" region="back-button" header="src/app/hero-detail/hero-detail.component.html (back button)">
</code-example>

Add a `goBack()` _method_ to the component class that navigates backward one step
in the browser's history stack
using the `Location` service that you [injected previously](#hero-detail-ctor).

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" region="goBack" header="src/app/hero-detail/hero-detail.component.ts (goBack)">

</code-example>


Refresh the browser and start clicking.
Users can navigate around the app, from the dashboard to hero details and back,
from heroes list to the mini detail to the hero details and back to the heroes again.

The details will look better when you add the private CSS styles to `hero-detail.component.css`
as listed in one of the ["final code review"](#final-code-review) tabs below.
-->
히어로 목록이나 대시보드 화면에서 히어로를 선택해서 히어로 상세정보 화면으로 이동했다면, 브라우저의 뒤로 가기 버튼을 눌렀을 때 이전 화면으로 돌아갈 수 있습니다.

이 기능을 실행하는 버튼이 `HeroDetail` 화면에 있다면 사용자가 애플리케이션을 사용하기 더 편할 것입니다.

컴포넌트 템플릿 맨 아래에 *뒤로 가기* 버튼을 추가하고 이 버튼을 컴포넌트의 `goBack()` 메소드와 바인딩 합니다.

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.html" region="back-button" header="src/app/hero-detail/hero-detail.component.html (뒤로 가기 버튼)">
</code-example>

그리고 컴포넌트 클래스에 `gBack()` _메소드_ 를 추가하는데, 브라우저의 히스토리 스택을 활용할 수 있도록 [이전에 주입받은](#hero-detail-ctor) `Location` 서비스를 사용합니다.

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" region="goBack" header="src/app/hero-detail/hero-detail.component.ts (goBack)">

</code-example>


브라우저가 다시 시작되면 이것 저것 클릭해 보세요.
사용자는 화면에 있는 버튼으로 히어로 목록이나 대시보드 화면을 이동할 수 있으며, 이전 화면으로 돌아갈 수도 있습니다.

The details will look better when you add the private CSS styles to `hero-detail.component.css`
as listed in one of the ["final code review"](#final-code-review) tabs below.


{@a final-code-review}
<!--
## Final code review
-->
## 최종코드 리뷰

<!--
Here are the code files discussed on this page.
-->
이 문서에서 다룬 코드를 확인해 보세요.

{@a approutingmodule}
{@a appmodule}
<!--
#### `AppRoutingModule`, `AppModule`, and `HeroService`
-->
#### _AppRoutingModule_, _AppModule_, _HeroService_

<code-tabs>
  <code-pane
    header="src/app/app-routing.module.ts"
    path="toh-pt5/src/app/app-routing.module.ts">
  </code-pane>
  <code-pane
    header="src/app/app.module.ts"
    path="toh-pt5/src/app/app.module.ts">
  </code-pane>
  <code-pane
    header="src/app/hero.service.ts"
    path="toh-pt5/src/app/hero.service.ts">
  </code-pane>
</code-tabs>

{@a appcomponent}
#### `AppComponent`

<code-tabs>
  <code-pane
    header="src/app/app.component.html"
    path="toh-pt5/src/app/app.component.html">
  </code-pane>

  <code-pane
    header="src/app/app.component.css"
    path="toh-pt5/src/app/app.component.css">
  </code-pane>
</code-tabs>

{@a dashboardcomponent}
#### `DashboardComponent`

<code-tabs>
  <code-pane
    header="src/app/dashboard/dashboard.component.html" path="toh-pt5/src/app/dashboard/dashboard.component.html">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.ts" path="toh-pt5/src/app/dashboard/dashboard.component.ts">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.css" path="toh-pt5/src/app/dashboard/dashboard.component.css">
  </code-pane>
</code-tabs>

{@a heroescomponent}
#### `HeroesComponent`

<code-tabs>
  <code-pane
    header="src/app/heroes/heroes.component.html" path="toh-pt5/src/app/heroes/heroes.component.html">
  </code-pane>

  <code-pane
    header="src/app/heroes/heroes.component.ts"
    path="toh-pt5/src/app/heroes/heroes.component.ts">
  </code-pane>

  <code-pane
    header="src/app/heroes/heroes.component.css"
    path="toh-pt5/src/app/heroes/heroes.component.css">
  </code-pane>
</code-tabs>

{@a herodetailcomponent}
#### `HeroDetailComponent`

<code-tabs>
  <code-pane
    header="src/app/hero-detail/hero-detail.component.html" path="toh-pt5/src/app/hero-detail/hero-detail.component.html">
  </code-pane>

  <code-pane
    header="src/app/hero-detail/hero-detail.component.ts" path="toh-pt5/src/app/hero-detail/hero-detail.component.ts">
  </code-pane>

  <code-pane
    header="src/app/hero-detail/hero-detail.component.css" path="toh-pt5/src/app/hero-detail/hero-detail.component.css">
  </code-pane>
</code-tabs>

<!--
## Summary
-->
## 정리

<!--
* You added the Angular router to navigate among different components.
* You turned the `AppComponent` into a navigation shell with `<a>` links and a `<router-outlet>`.
* You configured the router in an `AppRoutingModule`
* You defined routes, a redirect route, and a parameterized route.
* You used the `routerLink` directive in anchor elements.
* You refactored a tightly-coupled master/detail view into a routed detail view.
* You used router link parameters to navigate to the detail view of a user-selected hero.
* You shared the `HeroService` among multiple components.
-->
* 화면에 표시하는 컴포넌트를 전환하기 위해 Angular 라우터를 추가했습니다.
* `AppComponent`에 `<a>` 링크와 `<router-outlet>`을 추가하면 네비게이션 동작을 실행할 수 있습니다.
* 라우터 설정은 `AppRoutingModule`에 정의합니다.
* 간단한 라우팅 규칙부터 리다이렉트 라우팅 규칙, 라우팅 변수가 있는 라우팅 규칙을 정의해 봤습니다.
* 앵커 엘리먼트에 `routerLink` 디렉티브를 적용했습니다.
* 히어로 목록/상세정보 화면은 원래 결합도가 높았지만 라우터를 활용해서 결합도를 낮추도록 리팩토링했습니다.
* 히어로 목록 화면에서 사용자가 선택한 히어로의 정보를 히어로 상세정보 화면으로 전달하기 위해 라우터 링크 배열을 활용했습니다.
* 여러 컴포넌트에 사용하는 로직을 중복해서 구현하지 않고 `HeroService`로 옮겨서 재사용할 수 있도록 변경했습니다.
