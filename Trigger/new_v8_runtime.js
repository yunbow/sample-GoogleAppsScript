/**
 * V8トリガーバグ対策
 */
function doGet(){
    main();
}

/**
 * メインプログラム
 */
function main() {
    try {
        console.log('>>> main start');

        // 1分後にトリガーをセットする
        let date = new Date();
        date.setMinutes(date.getMinutes() + 1);
        date.setSeconds(0);
        console.log(`Trigger=${date}`);
        setTrigger(date);

    } catch (e) {
        console.error(e.stack);

    } finally {
        console.log('>>> main end');
    }
}

/**
 * トリガーを設定する
 * @param {Object} date 
 */
function setTrigger(date) {

    // 古いトリガーを削除する
    const oldTriggerList = ScriptApp.getProjectTriggers();
    for (let i in oldTriggerList) {
        const oldTrigger = oldTriggerList[i];
        if (oldTrigger.getHandlerFunction() == 'main') {
            ScriptApp.deleteTrigger(oldTrigger);
        }
    }

    // 新しいトリガーを設定する
    return ScriptApp.newTrigger('main')
      .timeBased()
      .at(date)
      .create();
}
