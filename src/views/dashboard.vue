<template>
  <div class="screen-overlay-wrapper">
    <div class="screen-overlay heavy-dark"></div>
  </div>
  <div class="dashboard-modal flex flex-column align-center">
    <button
      class="trellicons trellicons-close-btn dashboard-close"
      @click="closeDashboard"
    ></button>
    <section class="general-statistics flex">
      <div class="stats flex justify-between">
        <div class="content flex flex-column justify-between">
          <h3 class="flex flex-column">
            All tasks
            <h4>{{ taskCount }}</h4>
          </h3>
        </div>
        <svg
          class="chart-icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="75pt"
          height="44.999999pt"
          viewBox="0 0 75 44.999999"
        >
          <defs>
            <image
              id="image7"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAACWCAAAAACzjL+rAAAAAmJLR0QA/4ePzL8AAA6+SURBVHic7Vx5QFXFGv/mXrjKKuKKIpSg+Xxom2guiLlg9sQ9A8k0lwhTU0MtrdQySi2LSvNBVmaKomlPDX0Kgvhcyh0pxLSSxVxSBBHZ7p3+uNtZZs45FzhcuG9+/zAz55yZ7/zOb77vm7nnAMDAwMDAwMDAwMDAwMDAwMDAwMDAUD/ooLG3BQ6NCHsb4Ng4aW8DHBqBmDkHFcF8g6rIxva2wJHRDd9izkE9PAdb7W2CA0NbgEcz9aqGIe1/LmP0qoZJsAWQvY1wWHhd1Q1nea9qmOCyHwOjVy1Mh53A6FULPR65lcfoVQ1TYSMAC20qwf1Pt/Bqpl61MNE9tRoYvWphBiQBADjZ2w7HREhQYSEAU69KmAlfAwALberA7zIMNwAw56AOXnbapgcApl5V4JLXcsxdAGDqVQWTW2aUGEtMvXUPp9yOkwpMRfta4pB4tuOlfFOR0VvnQAvhMwDACDN6VcDwbn+dAwzIAIxeFfAarMEAgIGpVwWE9inKML0+ghGjt66xCD4zLikAA3YoeptHDuvetrLg0t6kIrvZ8ETYnTSzeB0q7206d4GXqXhn1Uf37WTFgcFxKQAAgAEcid4HdgfBwa0H88Bv4LMDITv8D7tYEZpRHG70DfVMr5Om2qBi977HfC/EZJgqAz7vUtC7QMXRqDjc7/1dxlI906ttqq8yqPZGZtPM4MzwEkvVY3foiVA7+IeR398eoQcTt1Cf2+n6snK9eu+7zgnOHWFlF+6OvBA8R7XBqHCKg5XV2IAN2AQH8b3ev3mGHOG19PlfScfb9W3G9IS8Z3kz1EF+DIpslsZnF46mNYusbys834bleotyMTY4yjtmQyFZ2JQMT9W3FYvbnjhjYddgMGCDgziHvA6dLgmauuTk+9WvEYHZTUYUmitGF2H/VRtCCAFgA9Qi7nm1gT+FbYXQZtuJA2fr8euRj5skFQDw7sPO6kUarZPGoNcbcM1paPfMqJAyD59rgma30kodwM0fklOramejUozaWRp2Hzj02n1RjJy0BoO+Nrp1HjFlqBaqf+/06FnBkYBL+SsfG/AgwK0t68/UykplcPvF781d1qrxnuwc2qorKqtrIdzW7xZsf9qwe+aQXAgWHhsCWSf+HRm+PLvFy6ePjlX/Ppf5Ze/mJg2NPu8NnPOCK1zYmnkfo5AVqUMER1MHLTgEAABth0V4wYWVG6tVNSb4GArPA4AG5XtrgYD5U5xh/5dXMABAk12e/Y7yDoeml4SXm8pO/V/sCBcX7VAxzOlOdF/3GQDf8zZeej1i57kbvt9wHUz38fSSnN7FnOPNjndZtsdcwYB6zg2E46/8pJo977yRF84JoWaSGym94asD4dCH161a0SYGHQq/aznusad/9lTu3gqgfgt9DAmv31HHnl5HNON+sdSss6Rh0oukp3GL+Ci49N55nptr/nU73oZk4aQi4E5VhHWRM3Q3Zm6re2sB3E91TlhtHgk4hYZJr1Zy5zLsq3bVH2/Xc9nFAF7xQZCanJav6xAyfjBkz+Lp1Hhmy7f6w6ZZKvxQ9G3UxTFV1nFMLzlAQ6UXIfrOu/PyWM3pt65xlWssasNnW34M+mRXNf+gCWFveRROTK9DSwEAYHpC1bA8/sM2oWHQi5SvLDps72n4aIuBH6BNxaYhA7r5wJ/nMzLLCYcBA4D3iicM7y6t259Nuh13XbCDP4y50ADoRVpttV7pyaHJra/OvWitY94fUUX8FDRRsdr9E27ZbiYVbie7bH8Ni8ywf2KGAAHSOGmrKpWKNybeOfP1e8YyaTIS+OTWMABA13UtL4fn1MBcMtDmiNxRFZSh7UyvEUrJRSvmw7oEzg+xgstF4iGf5/3pY8Xj99tiqBTiXr8XVshr4QypratR6gG6zS/qX002gOn9LeNfbNmyMBeMq31+m/Fk05+yXS0en3Czjv4JVtRqNI37P3PMQxutaET0uu4cWTrluJFQIXtkQnkPgfMU9OllIf+CQ3VhVMh3Tiu2cZ8rb+RGpF6PlEFFUbk8QoW6BY5PsBy3PgzONacvDhnUel/t9yAe2ueZFGeWq8UG67NuAJmDMrjuC7kVlWepEgjlni1uxIh/Sa8vmyZNVJywUBCY7nvwBT1tGMANITFTBN3egTeiTO/dCJdG3EaeayAct54QtMkjeULt+PXP9Ds/uow3iqnSsFdtImg3Rt6IuCrWIL9Azh1oSUbnrc23RdaGX9+MgJzR1m060tiNhN61McVjOD8TElkEok+QOC1gu/f2iJrz23F/wK+jzOsT8iNuJL53dnxlxHlrlUCVlBugXALQaUezxOiaxrcee9rkjDWyS59TjSJzCN2EZhy31MT5LebclDA14l3CzTcwxrfSxz3RJK1mNg1N8T41psg0uGVJjAWzpS7Uq+ng4+Hu6lJSUVRYUFEH/Qnhe6r1qnUAFCeKSEXiiplQ6rlVtziuJjZNW+u8f9p9YvDk1mpJb6v+wd0D/XXWhhs52Vknsmqb8PDgerDX/hnGtRoAUOY5CKelsEh5CMMSNe8ss3kDrUl8NCS+oQeyA6qjPYfgsUMfRgAA1wuLysvByd3Fv60WAODO4Yzdv9aiYx60O8OvDC8l7t9IbSzQGpHgKYyL1+6daOMGWufNj1e9uomasnDMqjG97ac+HwBw/8zJM1duVIP59xuNV/vA7r06AkDWjh3npXtQiLUxxSP+MFckySM7B+nsAaBvYovrL3Le/5AFil7lnv/CaZIvEIxRY/X2ih2thRs/pJ6rQoI+MQD2ejx0mBfAqS83FdM6UIyV8yufOWPumTeMsJHsNGRyNMDQfm0f2LIgHxSi8+cD4T+vFFP4FFhUI3ofXTkYKnclZSHE6ZB/d07dho9qBqVfxV+uyQBWrIqtnHyY278tErWeS1rMWdrQ1CUupe+vVvStgNf8WF3RvO3cl34EffPsqwG9/kuf1xQnJN0F0mqQM55mwJTeUP3dytO2D2GG87oplZMO04KZ0jyBLlwz/N8Pg4LViaVy9rjMWuiNN70pcNUSQraZXpfF81xK12ysUDIZDe2jI3WwZ1FNnXCz5LB7k3lvnRPVSCgpWFzwaRm8rCvcXvPpTSlzWk+b6QM/Lf5RIqYhAde20ts/sTPe+OE9INovijEYe0+e6mFIevN3G4cBAIBHkjtdm2D51YbEE5EuXjJKoVfcqh2xsAtU7NpwoJJsjKZv9LgmcO69FCwUqVTqaxu9zm8v0OTM4eRcRO/GL7q9FKOrTIgTvd4sBxTzgcupaebLZEKYbC4sVBmBaDTo5ScR3ElJSRO+KgyeIU+N8gWctiYVS/QqbrBtz8F/ay/9B4nmNYPcLVn+toiN0txfG684NgMAwAPrB0LiOxX0gSiznsgcr0Z3F9g/MiIAAH47nZVbcOVWOQBq1dq3S9eeQVqAK0mbL/P7N16PhIxy67bQOyipVf70C2LDiEGbWzT4zR+LqpI//VHxUO6vzXO5Pjud1jvPyVH8LLedvnYV3cZDTz/Z28XUUt7UVKg6mbr3HG0UutBsojfmE6fM6DJ+L+TwLM4iDA++FKmDrC++UZQIu0QvbGvYsLyEajgtO6MQTa2Rn4dzUNA/O3bw8dYCQMnVq7/mZJ0p552FBI+a7owV04tWxkJCHGfpz+uIcuuc28XeUZN9oTxlS8o9mZF8XopuA0cXZQv7tfRP8UX0iCYZfSjtCIPGo7yCeKroDUOqv1FKr9P656vm7URERsnxW9SEoe9z4TooTzuQcZ66ieI+YkKYMxxZcQQocZNblfCiwgyJc4QamKRIk5IoJr7DZUtiptsyumKCdcuV4hRkGjGA24DwYa4ARZkZp89yPgE2wqVH3yH9dHA76dtcOnXySZco+lAJFfFCm4TS49FbFNKrSx5ZNp6z+pINZhJnNun75IB/AAC+cvly/s3r98oqtJ4ert5+DwQFagHKMzb/t5LaG12JVOUJRScV6CXnPIlP4nvINjsHtDGqZJx56UU0R84ZCgxt/mjww93aC4e5e/bY0ePlkndFnZKcBEnEoGAYWzSoSKKiVmtNEb1rY0pH/iy4lBywaVogEe3h5+fTso0nalZ1r/h+cWHBpavSbkY4qIQ7AMp5QHIIUvoFAEx6PVYmulmghN6lS8rGn6DeG+X2KfeuIIZLMUoNqBIalVWgAvLE5/H3xmjXK6B36hf6iEMUe2nZkKwHoZ6k3I3apEKep5KLWpbTRG5GAe88yNPbJ1037xvuoCRa+ANTfS6lRp/ZtgQb0bnSs14JURhRlSzzdY0Jsl/E++7Qrd/A65jsFhSIm+4ZuBKlZ1WiMYW2Ck4lOlL5NsEQSlRAhZx6mx7ucWQ0+TMQ2qyl1mguT9oVSq3GZK8lfsMlWtRS8wHqEaWQU+/qHgXPWb42VDTpFfhaGdkJ+pMTqZK+hJfw/CpfATKJhG2QUe/oHdVh5uUE/4nLhjTRJfRDsvNO0iXQsnuFuVPtOZSAtHr918PSU0QzOJsGClMnqdxULvAoFLBIo6JuzaaoyikHkupF6aGpYwm2K82IpFiRizuKpCfnZWTb1YakemeF3p5ukik1A0B8kdRco8RsVNwmjlZU6hQmT2pCSr0B59wm7jRXaO5PPNGkJCrHpxKVSsXzBsAoDxLqRV+4fW/8llOaJeUOgVCh8SGVnfFHl9xusDck1Dvxm9uP/GUqSy4PxVvNgu83lPlR4XqClozSLW54oNPbPLdVzNeWmvBuhdFNLmzJhjJjNw7AKA905/Buq2MbOPdlkNIg8Z85kSKZxE8qomrjJdUKqnqDzqBe2TaQAUQ3oEy1Eq2NHFT1fuCUeB5AkIQpye9JqQRtH6+Bxfm6B029Q/eVdL1ByTvFIG2NEuHodApBUS+Kg1WWf2JFTvgF+ZGBLsX/N07lMQ5f89TyodFqNUIgIuxtfIMHysKzjJQqIxQ1ms87GwSG4wIXGUIZnTXHETybMaoa+uObLgghxGa8KtiJl9jbBAcB8ZNtn3ZzZT+SYWBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBQiL8BX2E73aMo1jIAAAAASUVORK5CYII="
            ></image>
            <mask id="mask0"><use xlink:href="#image7"></use></mask>
            <image
              id="image6"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAACWCAIAAAAZhXcgAAAABmJLR0QA/wD/AP+gvaeTAAAEyklEQVR4nO3dW3YqOQwFUNPrzn/K9Ae96NxgoCj8kOy9B5BQsnwiFxUoBQAAAAAAAAAAAAAAAGBLl9kvAIjler2WUv6Z/TKAiEQDUOFAAfzvdpoopgagSjQAFQ4UwH/up4liagCqTA1AKX+PDMXUAFSJBqDCgQL4fZoopgagSjQAFQ4UsLvH00QxNQBVpgbYWnVkKKYGoEo0ABUOFLCvZ6eJYmoAqkwNsKkXI0MxNQBVpgbY0euRoZgagCpTA2zn7chQTA1AlakB9nJkZCimBqBKNAAVDhSwkYOniWJqAKpMDfR15M/U5aIPRzg+MhTRQD8fNWIREP2JBub7NBdupEM/Hyd1p9exvF+F1tM/ncuFG5XsRDQMUi20ti7f5cKNMjZ3YlH+9Hgd8Ohxw38fIhxxrs7evKSlZ11YHQSeTQciIwKT23n3DjYA3504ZzmadXU6Zx0oztO+R7yt0uVyMSYE5EBBRwfTU8h28k3mmhome7t4ibZNwz/+P39UogqsRDTMsdII3fta3NM558t1EQ0TrJEL46/i9hsFxBHfr45oiCvsHpgbbYaIMURDLMHbPdS8Y4h4pskyKesEGf//4nS3Hbk6z1Y31Cq+FZQ3eu/bZq0sHUopooExeu/b5ieUzQOiYT23rmN2XW/IDdi0ne5cbJsObeu5aRHX0O+5oFC3G8/ZMCDarpoHpfnL9XpdIBfKEun2kebX683LQKY/HbzYdtrn3c0eCyca5guyIYO8jOau1+va6dDrlk2PH8oLBxdycDevmgt3q6ZDv4VzryGikX28zM2F13a4xrZEw9a22jDrXWzXK1pzyors9XIOnheG/a44ljlZ9F6+RcrEp/bMhbvsATFg+XIXiHM2z4WbvOkwZvmyVofT5MJdxnQYtnz5SsM35MIvudJh5PJ5h4KtJcrKwS81U2TypUTbYLD4s8P4tTM17EIu5DVl7aKH5UHHaxf/70MPcuGtsI0xa+2CluOtlp9mE7UnWpELx4VqhrkLF6gQR/R9MjRSW7QiFz4VpA2mL1yIKrw1+t5sjOZoYnqHZTS3AYIsWfQ9MHmmSp4RQZosqc0/TSdu6weqUc6AiFPA1IatfrT1itj00Wp0kyggYhYwta6rH3O9YrV7zBr9FD8g4tcwr+arH3mxAjV65DL9EjYgEtUwtS8bIMUyhWjxFJV6FCogktYwu496INcazW/uXPV6FCEgstdwMZfLZYEVmdzWC1TwZlZALFNAovFoR2PbvtfFYvyt66VfRuxQPabb+nmvYZrExIZ1Y6LR0aC/F76nzUp8expQ4QtRgAofAAdUeKcNqBgRDXIB0ukeDXIBgqu+a9Y3GuQCjNTwQbvtPqAC8hr5rzp/hv0moCrCP+8+8pw/9BVz57/V5UXLBZb084MYkm7449pfnlwgo+W3+qfca2ALdv6nNvqEXJZhnw/QssRygYbs/7kcKBjNnk+h2SIZGTZnwy/G1ECFfU6bDjAyZGHPc5CpYTU2P034pOPQ7HNm+bbz5MI37HzCcqBoyVZnGet/F3hDdj772HpqsNXhmcWjweaHc87vnCmnCVsdxogyNdjzEErfaLDhIalm0SAFYCW+8xIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgWf8CIXr4GSLN8pAAAAAASUVORK5CYII="
            ></image>
          </defs>
          <g id="surface1">
            <use
              xlink:href="#image6"
              mask="url(#mask0)"
              transform="matrix(0.3,0,0,0.3,-8.024999,0)"
            ></use>
          </g>
        </svg>
      </div>
      <div class="stats flex justify-between">
        <div class="content">
          <h3 class="flex flex-column">
            All lists
            <h4>{{ listCount }}</h4>
          </h3>
        </div>
        <svg
          class="chart-icon-graph"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 490 490"
          style="enable-background: new 0 0 490 490"
          xml:space="preserve"
        >
          <g>
            <polygon points="0,490 20.851,469.149 	" />
            <path
              d="M109.234,444.226c31.796,0,57.666-25.871,57.666-57.677c0-20.253-10.505-38.089-26.343-48.379l11.111-101.612
		c3.218,0.56,6.522,0.867,9.897,0.867c12.324,0,23.748-3.899,33.13-10.511l122.239,31.837c3.999,27.928,28.065,49.464,57.072,49.464
		c31.806,0,57.676-25.87,57.676-57.677c0-20.985-11.273-39.383-28.079-49.472l29.514-85.743C464.551,114.9,490,89.209,490,57.666
		C490,25.87,464.129,0,432.333,0c-31.806,0-57.676,25.87-57.676,57.666c0,24.765,15.686,45.927,37.644,54.085l-28.232,82.019
		c-3.271-0.578-6.629-0.897-10.063-0.897c-27.291,0-50.201,19.066-56.149,44.573l-106.958-27.859
		c5.286-8.71,8.333-18.924,8.333-29.837c0-31.796-25.871-57.666-57.667-57.666c-31.806,0-57.676,25.87-57.676,57.666
		c0,20.806,11.073,39.068,27.633,49.214l-11.047,101.028c-3.638-0.722-7.395-1.108-11.241-1.108
		c-31.806,0-57.676,25.87-57.676,57.666C51.557,418.354,77.427,444.226,109.234,444.226z M395.508,57.666
		c0-20.301,16.523-36.814,36.825-36.814s36.816,16.514,36.816,36.814c0,20.302-16.514,36.826-36.816,36.826
		S395.508,77.968,395.508,57.666z M374.006,213.724c20.301,0,36.825,16.514,36.825,36.814c0,20.302-16.524,36.826-36.825,36.826
		c-20.302,0-36.816-16.524-36.816-36.826C337.19,230.237,353.704,213.724,374.006,213.724z M161.564,142.934
		c20.302,0,36.816,16.514,36.816,36.815s-16.514,36.825-36.816,36.825c-20.301,0-36.825-16.523-36.825-36.825
		S141.264,142.934,161.564,142.934z M109.234,349.734c20.302,0,36.815,16.514,36.815,36.814c0,20.302-16.513,36.826-36.815,36.826
		c-20.302,0-36.825-16.524-36.825-36.826C72.408,366.248,88.932,349.734,109.234,349.734z"
            />
          </g>
        </svg>
      </div>
      <div class="stats flex justify-between">
        <h3 class="flex flex-column">
          Members
          <h4>{{ memberCount }}</h4>
        </h3>
        <svg
          class="chart-member"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <g>
              <g>
                <path
                  d="M147.583,257.358c23.308,0,42.272-18.93,42.272-42.196s-18.962-42.196-42.272-42.196
				c-23.309,0-42.272,18.929-42.272,42.196S124.275,257.358,147.583,257.358z M147.583,189.133
				c14.393,0,26.102,11.677,26.102,26.028c0,14.352-11.709,26.028-26.102,26.028s-26.102-11.677-26.102-26.028
				C121.481,200.81,133.19,189.133,147.583,189.133z"
                />
                <path
                  d="M435.663,207.557H421.46v-41.03c0-34.599-28.149-62.749-62.75-62.749h-7.883c-34.6,0-62.75,28.149-62.75,62.749v41.03
				h-2.646c-4.465,0-8.084,3.62-8.084,8.084c0,4.465,3.62,8.084,8.084,8.084h150.23c4.465,0,8.084-3.62,8.084-8.084
				C443.747,211.177,440.127,207.557,435.663,207.557z M405.292,207.557H304.247v-41.03c0-25.684,20.896-46.58,46.581-46.58h7.883
				c25.685,0,46.581,20.896,46.581,46.58V207.557z"
                />
                <path
                  d="M511.863,247.335c-7.547-79.902-49.526-151.694-115.453-197.85c0.415-2.368,0.631-4.804,0.631-7.289
				C397.04,18.93,378.078,0,354.77,0c-12.139,0-23.1,5.135-30.817,13.342c-19.031-6.173-38.759-10.248-58.731-12.126
				c-8.71-0.819-17.434,2.091-23.912,7.989c-6.473,5.893-10.186,14.287-10.186,23.032v2.488
				c-60.86,2.004-117.786,26.601-161.055,69.775C24.884,149.587,0,209.533,0,273.296s24.884,123.71,70.069,168.795
				C115.249,487.173,175.316,512,239.208,512c63.891,0,123.96-24.827,169.139-69.908c43.27-43.176,67.923-99.977,69.935-160.711
				h2.511c8.779,0,17.202-3.722,23.108-10.212C509.782,264.706,512.683,256.019,511.863,247.335z M354.77,16.168
				c14.393,0,26.102,11.677,26.102,26.028c0,2.784-0.441,5.467-1.257,7.985c-0.057,0.156-0.11,0.314-0.157,0.471
				c-3.528,10.214-13.263,17.572-24.689,17.572c-14.393,0-26.102-11.676-26.102-26.028S340.377,16.168,354.77,16.168z
				 M239.208,495.832c-122.985,0-223.039-99.829-223.039-222.536c0-120.003,95.705-218.125,214.955-222.391v199.329
				c0,17.174,13.994,31.147,31.196,31.147h199.781C457.826,400.36,359.482,495.832,239.208,495.832z M491.943,260.287
				c-2.89,3.177-6.85,4.925-11.149,4.925H262.32c-8.287,0-15.028-6.719-15.028-14.978V42.677V32.238
				c0-4.265,1.741-8.198,4.901-11.075c3.166-2.881,7.253-4.249,11.514-3.847c17.455,1.642,34.715,5.066,51.43,10.199
				c-1.706,4.575-2.639,9.522-2.639,14.683c0,23.267,18.962,42.196,42.272,42.196c14.901,0,28.025-7.735,35.555-19.396
				c60.2,43.494,98.465,109.995,105.442,183.858C496.166,253.079,494.808,257.138,491.943,260.287z"
                />
                <path
                  d="M228.477,380.522h-14.202v-41.03c0-34.6-28.149-62.749-62.75-62.749h-7.883c-34.6,0-62.75,28.149-62.75,62.749v41.03
				h-2.646c-4.465,0-8.084,3.62-8.084,8.084c0,4.465,3.62,8.084,8.084,8.084h150.231c4.465,0,8.084-3.62,8.084-8.084
				C236.561,384.141,232.942,380.522,228.477,380.522z M198.106,380.522H97.061v-41.03c0-25.685,20.896-46.58,46.581-46.58h7.883
				c25.685,0,46.581,20.896,46.581,46.58V380.522z"
                />
                <path
                  d="M469.505,207.557h-1.156c-4.465,0-8.084,3.62-8.084,8.084c0,4.465,3.62,8.084,8.084,8.084h1.156
				c4.465,0,8.084-3.62,8.084-8.084C477.589,211.177,473.97,207.557,469.505,207.557z"
                />
                <path
                  d="M261.164,380.522c-4.465,0-8.084,3.62-8.084,8.084c0,4.465,3.62,8.084,8.084,8.084h1.156c4.465,0,8.084-3.62,8.084-8.084
				c0-4.465-3.62-8.084-8.084-8.084H261.164z"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </section>
    <section class="chart-container flex">
      <div class="task-per-label flex flex-column">
        <h1>Task per Label</h1>
        <PieChart :chartData="labelsData" />
      </div>
      <div class="task-per-member flex flex-column">
        <h1>Task per Member</h1>
        <PolarAreaChart :chartData="membersData" />
      </div>
    </section>
  </div>
</template>
<script>
import { PieChart, PolarAreaChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import {utilService} from '../services/util-service.js'
Chart.register(...registerables)

export default {
  name: 'dashboard',
  components: { PieChart, PolarAreaChart },
  props: {
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 250,
    },
  },

  data() {
    return {
      board: this.$store.getters.board,
      labelsData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#f2d600',
              '#ff9f1a',
              '#eb5a46',
              '#c377e0',
              '#0079bf',
              '#00c2e0',
              '#51e898',
            ],
          },
        ],
      },
      membersData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
            ],
          },
        ],
      },
    }
  },
  created() {
    const labelsDataSet = this.$store.getters.labelToTaskMap
    const membersDataSet = this.$store.getters.memberToTaskMap
    Object.keys(labelsDataSet).map((label) => {
      this.labelsData.labels.push(label)
      this.labelsData.datasets[0].data.push(labelsDataSet[label])
    })
        Object.keys(membersDataSet).map((memberName) => {
      this.membersData.labels.push(memberName)
      this.membersData.datasets[0].data.push(membersDataSet[memberName])
      this.membersData.datasets[0].backgroundColor.push(utilService.getRandomColor())
    })

  },
  computed: {
    taskCount() {
      return this.board.groups.reduce((acc = 0, group) => {
        return acc?.tasks?.length + group?.tasks?.length
      })
    },
    listCount() {
      return this.board?.groups?.length
    },
    memberCount() {
      return this.$store.getters.users?.length || 0
    },
  },
  methods: {
    closeDashboard() {
      this.$router.push('/board/' + this.board._id)
    },
  },
}
</script>
<style></style>
