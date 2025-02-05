import { ChangeEvent, useEffect, useState } from "react";
import "./App.scss";
import MainBackContainer from "./components/main-back-container/main-back-container";
import { InputLogin } from "./components/input-login/input-login";
import ShadowElement from "./components/shadow-element/shadow-element";

function App() {
  const [amount, setAmount] = useState("");

  const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value;
    if (!isNaN(Number(newData))) {
      setAmount(newData);
    }
  };

  //добавление скриптов
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://securepay.tinkoff.ru/html/payForm/static/css/t-widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff.js";
    script.async = true;
    script.onload = () => {
      console.log("Tinkoff Pay script loaded");
    };
    script.onerror = () => {
      console.error("Error loading Tinkoff Pay script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  //Обработчик сабмита
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    console.log("Form data:", {
      terminalKey: form.terminalkey.value,
      amount: form.amount.value,
      email: form.email.value,
      phone: form.phone.value,
      description: form.description.value,
    });

    const container = document.getElementById("tinkoffWidgetContainer");
    if (!container) {
      console.error("Container for Tinkoff widget not found");
      return;
    }

    // Данные для чека
    Object.defineProperty(form.receipt, "value", {
      get: function () {
        return JSON.stringify({
          Email: form.email.value,
          Phone: form.phone.value,
          EmailCompany: "mail@mail.com",
          Taxation: "patent",
          Items: [
            {
              Name: form.description.value || "Оплата",
              Price: form.amount.value + "00",
              Quantity: 1.0,
              Amount: form.amount.value + "00",
              PaymentMethod: "full_prepayment",
              PaymentObject: "service",
              Tax: "none",
            },
          ],
        });
      },
    });

    // Инициализация виджета
    const widgetParameters = {
      container: container,
      terminalKey: form.terminalkey.value,
      paymentSystems: {
        TinkoffPay: {
          paymentInfo: function () {
            return {
              infoEmail: "mailmail@mail.ru",
              paymentData: form,
            };
          },
        },
      },
    };
    //@ts-ignore
    if (typeof window.initPayments === "function") {
      console.log("initPayments function exists");
      try {
        //@ts-ignore
        window.initPayments(widgetParameters);
        console.log("initPayments was called successfully");
      } catch (error) {
        console.error("Error initializing Tinkoff Pay:", error);
      }
    } else {
      console.error("initPayments function does not exist");
    }
  };

  return (
    <div className="container">
      <MainBackContainer size={"m"}>
        <h1 className="Payment-Heading">
          Пополнение баланса <br />с банковской карты
        </h1>
        <ShadowElement hovered={false} className="Payment-Balance">
          <p>Текущий баланс</p>
          <h1>330.00 ₽</h1>
        </ShadowElement>
        <InputLogin
          text="Номер договора"
          type="text"
          value={"№ " + "2132131"}
          disabled={true}
        />
        <InputLogin
          text="Сумма заказа"
          type="text"
          value={amount}
          onChange={onChangeAmount}
        />

        <form name="TinkoffPayForm" onSubmit={handleSubmit}>
          <input
            className="tinkoffPayRow"
            type="hidden"
            name="terminalkey"
            value="1736757221136"
          />
          <input
            className="tinkoffPayRow"
            type="hidden"
            name="frame"
            value="true"
          />
          <input
            className="tinkoffPayRow"
            type="hidden"
            name="language"
            value="ru"
          />
          <input
            className="tinkoffPayRow"
            type="text"
            placeholder="Сумма заказа"
            name="amount"
            value={amount}
            required
          />
          <input
            className="tinkoffPayRow"
            type="text"
            placeholder="Номер заказа"
            name="order"
          />
          <input
            className="tinkoffPayRow"
            type="text"
            placeholder="Описание заказа"
            name="description"
          />
          <input
            className="tinkoffPayRow"
            type="text"
            placeholder="ФИО клиента"
            name="name"
          />
          <input
            className="tinkoffPayRow"
            type="text"
            placeholder="E-mail"
            name="email"
            required
          />
          <input
            className="tinkoffPayRow"
            type="text"
            placeholder="Контактный телефон"
            name="phone"
          />
          <input
            className="tinkoffPayRow"
            type="hidden"
            name="receipt"
            value=""
          />
          {/* Это кнопка, о которой вы говорили */}
          <input className="tinkoffPayRow" type="submit" value="Оплатить" />
        </form>

        {/* Контейнер виджета из указанного вами раздела */}
        <div id="tinkoffWidgetContainer"></div>
      </MainBackContainer>
    </div>
  );
}

export default App;
