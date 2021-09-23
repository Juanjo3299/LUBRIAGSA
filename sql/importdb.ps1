$PSScriptRoot

$files = Get-ChildItem $PSScriptRoot
Clear-Content $PSScriptRoot'\query.sql'
for ($i = 0; $i -lt $files.Count; $i++) {
    $fileName = $files[$i].Name
    
    if ($fileName -contains 'importdb.ps1' -Or $fileName -contains 'query.sql') {
    }
    else {
        if (Test-Path -Path $PSScriptRoot'\'$fileName -PathType Container) {
            $files2 = Get-ChildItem $PSScriptRoot'\'$fileName
            for ($j = 0; $j -lt $files2.Count; $j++) {
                $fileName2 = $files2[$j].Name


                if (Test-Path -Path $PSScriptRoot'\'$fileName'\'$fileName2 -PathType Container) {
                    $files3 = Get-ChildItem $PSScriptRoot'\'$fileName'\'$fileName2
                    for ($k = 0; $k -lt $files3.Count; $k++) {
                        $fileName3 = $files3[$k].Name
                        Add-Content -Path $PSScriptRoot'\query.sql' -Value (Get-Content -Path $PSScriptRoot'\'$fileName'\'$fileName2'\'$fileName3 -Stream $DATA)
                        # type $PSScriptRoot'\'$fileName'\'$fileName2 > $PSScriptRoot'\query.sql'
                    }
                }
                else {            
                    Add-Content -Path $PSScriptRoot'\query.sql' -Value (Get-Content -Path $PSScriptRoot'\'$fileName'\'$fileName2 -Stream $DATA)           
                }
            }
        }
        else {            
            Add-Content -Path $PSScriptRoot'\query.sql' -Value (Get-Content -Path $PSScriptRoot'\'$fileName -Stream $DATA)            
        }
    }
}