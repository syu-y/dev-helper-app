import { StringUtils } from '@/utils/stringUtils';

/**
 * キャメルケース変換
 * 変換対象：スネークケース、ケバブケース、パスカルケース
 * */
export const strToCamelCase = (value: string) => {
  // Keyから"-" or "_" + 小文字を探し、大文字に変換し"-"と"_"を削除
  let result = value.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

  // パスカルケースの場合は先頭を小文字に変換
  if (StringUtils.isUpperCase(result.charAt(0))) {
    result = StringUtils.strReplaceByIndex(
      result,
      0,
      0,
      result.charAt(0).toLowerCase()
    );
  }
  return result;
};

/**
 * スネークケースへの変換
 * キャメルケースとケバブケースをスネークケースに変換
 * */
export const strToSnakeCase = (value: string) => {
  // Keyから"-" or 大文字を探し、"_"の場合は"_"に置き換え大文字は小文字に変換して"_"を挿入
  let result = value.replace(/([-])|([A-Z])/g, (group) => {
    if (group.includes('-')) {
      return group.replace('-', '_');
    } else {
      return '_' + group.toLowerCase();
    }
  });

  // パスカルケースの場合は先頭の"_"を削除
  if (result.charAt(0).includes('_')) {
    result = result.replace('_', '');
  }

  return result;
};
