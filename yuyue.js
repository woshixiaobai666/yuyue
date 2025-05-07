(function () {
    'use strict';

    // 从全局获取用户配置
    const config = window.ICBC_CONFIG || {};
    const myName = config.myName || '';
    const myPhone = config.myPhone || '';
    const myIdCard = config.myIdCard || '';
    const myBranchKeyword = config.myBranchKeyword || '';

    function triggerVueInput(el, value) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(el, value);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function waitAndFill(placeholderText, value, callback) {
        const timer = setInterval(() => {
            const inputs = document.querySelectorAll('input.el-input__inner');
            for (const input of inputs) {
                if (input.placeholder.includes(placeholderText)) {
                    triggerVueInput(input, value);
                    console.log(`✅ 已填写：${placeholderText}`);
                    clearInterval(timer);
                    if (callback) callback();
                    break;
                }
            }
        }, 300);
    }

    function clickQueryButton(callback) {
        const timer = setInterval(() => {
            const btn = document.querySelector('span.keyWordQuery');
            if (btn) {
                btn.click();
                console.log('✅ 已点击：按关键字查询');
                clearInterval(timer);
                if (callback) callback();
            }
        }, 300);
    }

    function fillBranchKeyword() {
        const timer = setInterval(() => {
            const inputs = document.querySelectorAll('input.el-input__inner');
            for (const input of inputs) {
                if (input.placeholder.includes('请输入关键字查询网点')) {
                    triggerVueInput(input, myBranchKeyword);
                    console.log('✅ 已填写网点关键词');
                    clearInterval(timer);
                    break;
                }
            }
        }, 300);
    }

    function selectExchangeTime(callback) {
        const inputTimer = setInterval(() => {
            const timeInput = Array.from(document.querySelectorAll('input.el-input__inner')).find(el => el.placeholder.includes('请选择兑换时间'));
            if (timeInput) {
                timeInput.click();
                console.log('✅ 展开兑换时间下拉框');
                clearInterval(inputTimer);

                const listTimer = setInterval(() => {
                    const firstOption = document.querySelector('.el-select-dropdown__item');
                    if (firstOption) {
                        firstOption.click();
                        console.log('✅ 已选择最近兑换时间');
                        clearInterval(listTimer);
                        if (callback) callback();
                    }
                }, 300);
            }
        }, 300);
    }

    function checkAgreement(callback) {
        const timer = setInterval(() => {
            const checkbox = document.querySelector('.el-checkbox__inner');
            if (checkbox) {
                checkbox.click();
                console.log('✅ 已勾选协议');
                clearInterval(timer);
                if (callback) callback();
            }
        }, 300);
    }

    function clickConfirmReservation() {
        const timer = setInterval(() => {
            const btn = document.querySelector('.mybutton');
            if (btn && btn.textContent.includes('确认预约')) {
                btn.click();
                console.log('✅ 已点击确认预约按钮');
                clearInterval(timer);
            }
        }, 300);
    }

    // 主流程
    waitAndFill('客户姓名', myName);
    waitAndFill('手机号码', myPhone);
    waitAndFill('证件号码', myIdCard, () => {
        setTimeout(() => {
            clickQueryButton(() => {
                setTimeout(() => {
                    fillBranchKeyword();

                    setTimeout(() => {
                        selectExchangeTime(() => {
                            setTimeout(() => {
                                checkAgreement(() => {
                                    console.log('✅ 所有填写操作完成，准备点击确认预约');
                                    setTimeout(() => {
                                        clickConfirmReservation();
                                    }, 1000);
                                });
                            }, 500);
                        });
                    }, 1500);
                }, 1000);
            });
        }, 500);
    });

})();
